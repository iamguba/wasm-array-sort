mod array;
mod operation;
mod utils;

use js_sys::Uint16Array;
use wasm_bindgen::prelude::*;

use array::Array;
use operation::Operation;

use rand::Rng;
use std::cmp::Ordering;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Sorting {
    array: Array,
    size: usize,
    values: Vec<u16>,
    algo: fn(&mut Self),
    operations: Vec<Operation>,
    current_operation: usize,
}

impl Sorting {
    fn set_algo(&mut self, algo: fn(&mut Self)) {
        self.algo = algo;
        self.operations = vec![];
        self.current_operation = 0;
        self.reset_stats();
    }

    fn pre_sort(&mut self) {
        self.values = self.array.clone_values();
        (self.algo)(self);
        self.values.clear();
    }

    fn pre_read(&mut self, index: usize) -> u16 {
        self.operations.push(Operation::Read(index));
        self.values[index]
    }

    fn pre_write(&mut self, index: usize, value: u16) {
        self.operations.push(Operation::Write(index, value));
        self.values[index] = value;
    }

    fn pre_swap(&mut self, left_index: usize, right_index: usize) {
        let left = self.values[left_index];
        let right = self.values[right_index];

        self.pre_write(left_index, right);
        self.pre_write(right_index, left);

        self.operations.push(Operation::Swap);
    }

    fn pre_compare(&mut self, left_index: usize, right_index: usize) -> Ordering {
        let left = self.pre_read(left_index);
        let right = self.pre_read(right_index);

        self.operations.push(Operation::Compare);
        left.cmp(&right)
    }
}

#[wasm_bindgen]
impl Sorting {
    pub fn new(size: usize) -> Self {
        Self {
            array: Array::new(size),
            size,
            values: vec![],
            algo: |_| {},
            operations: vec![],
            current_operation: 0,
        }
    }

    #[wasm_bindgen(js_name = resetStats)]
    pub fn reset_stats(&mut self) {
        self.array.reset_stats();
    }

    pub fn shuffle(&mut self) {
        self.set_algo(|s| {
            let mut rng = rand::thread_rng();

            for i in 0..s.size - 1 {
                let j = rng.gen_range(0..s.size - 1);
                s.pre_swap(i, j);
            }
        });
    }

    pub fn reverse(&mut self) {
        self.set_algo(|s| {
            for i in 0..s.size {
                s.pre_write(i, (s.size - i) as u16);
            }
        });
    }

    pub fn bubble(&mut self) {
        self.set_algo(|s| loop {
            let mut has_swapped = false;

            for i in 0..s.size - 1 {
                if s.pre_compare(i, i + 1) == Ordering::Greater {
                    s.pre_swap(i, i + 1);
                    has_swapped = true;
                }
            }

            if !has_swapped {
                break;
            }
        });
    }

    pub fn cocktail(&mut self) {
        self.set_algo(|s| loop {
            let mut has_swapped = false;

            for i in 0..s.size - 1 {
                if s.pre_compare(i, i + 1) == Ordering::Greater {
                    s.pre_swap(i, i + 1);
                    has_swapped = true;
                }
            }

            if !has_swapped {
                break;
            }

            for i in (1..s.size).rev() {
                if s.pre_compare(i - 1, i) == Ordering::Greater {
                    s.pre_swap(i - 1, i);
                    has_swapped = true;
                }
            }

            if !has_swapped {
                break;
            }
        });
    }

    pub fn selection(&mut self) {
        self.set_algo(|s| {
            for i in 0..s.size - 1 {
                let mut min_index = i;

                for j in i + 1..s.size {
                    if s.pre_compare(min_index, j) == Ordering::Greater {
                        min_index = j;
                    }
                }

                if min_index != i {
                    s.pre_swap(i, min_index);
                }
            }
        });
    }

    pub fn insertion(&mut self) {
        self.set_algo(|s| {
            for i in 1..s.size {
                let mut j = i;
                while j > 0 && s.pre_compare(j - 1, j) == Ordering::Greater {
                    s.pre_swap(j - 1, j);
                    j -= 1;
                }
            }
        });
    }

    pub fn gnome(&mut self) {
        self.set_algo(|s| {
            let mut index = 0;
            while index < s.size {
                if index == 0 || s.pre_compare(index - 1, index) != Ordering::Greater {
                    index += 1;
                } else {
                    s.pre_swap(index - 1, index);
                    index -= 1;
                }
            }
        });
    }

    pub fn cycle(&mut self) {
        self.set_algo(|s| {
            for cycle_start in 0..s.size - 1 {
                let mut item = s.pre_read(cycle_start);
                let mut pos = cycle_start;

                for i in cycle_start + 1..s.size {
                    if s.pre_read(i) < item {
                        pos += 1;
                    }
                }

                if pos == cycle_start {
                    continue;
                }

                while item == s.pre_read(pos) {
                    pos += 1;
                }

                if pos != cycle_start {
                    let temp = s.pre_read(pos);
                    s.pre_write(pos, item);
                    item = temp;
                }

                while pos != cycle_start {
                    pos = cycle_start;

                    for i in cycle_start + 1..s.size {
                        if s.pre_read(i) < item {
                            pos += 1;
                        }
                    }

                    while item == s.pre_read(pos) {
                        pos += 1;
                    }

                    if item != s.pre_read(pos) {
                        let temp = s.pre_read(pos);
                        s.pre_write(pos, item);
                        item = temp;
                    }
                }
            }
        });
    }

    #[wasm_bindgen(js_name = oddEven)]
    pub fn odd_even(&mut self) {
        self.set_algo(|s| {
            let mut sorted = false;

            while !sorted {
                sorted = true;

                for i in (1..s.size - 1).step_by(2) {
                    if s.pre_compare(i, i + 1) == Ordering::Greater {
                        s.pre_swap(i, i + 1);
                        sorted = false;
                    }
                }

                for i in (0..s.size - 1).step_by(2) {
                    if s.pre_compare(i, i + 1) == Ordering::Greater {
                        s.pre_swap(i, i + 1);
                        sorted = false;
                    }
                }
            }
        });
    }

    #[wasm_bindgen(js_name = quickSort)]
    pub fn quick_sort(&mut self) {
        self.set_algo(|s| {
            fn quick_sort_recursive(_s: &mut Sorting, low: usize, high: usize) {
                if low < high {
                    let pivot_index = partition(_s, low, high);
                    if pivot_index > 0 {
                        quick_sort_recursive(_s, low, pivot_index - 1);
                    }
                    quick_sort_recursive(_s, pivot_index + 1, high);
                }
            }

            fn partition(_s: &mut Sorting, low: usize, high: usize) -> usize {
                let pivot = _s.pre_read(high);
                let mut i = low;

                for j in low..high {
                    if _s.pre_read(j) < pivot {
                        _s.pre_swap(i, j);
                        i += 1;
                    }
                }

                _s.pre_swap(i, high);
                i
            }

            let size = s.size;
            if size > 0 {
                quick_sort_recursive(s, 0, size - 1);
            }
        });
    }

    pub fn tick(&mut self) -> bool {
        if self.operations.is_empty() {
            self.pre_sort();
        }

        match self.operations.get(self.current_operation) {
            Some(operation) => {
                self.array.apply(operation);
                self.current_operation += 1;
                true
            }
            None => false,
        }
    }

    pub fn flush(&mut self) -> () {
        loop {
            if !self.tick() {
                return;
            }
        }
    }

    pub fn frame(&mut self, seconds: u16) -> bool {
        if self.operations.is_empty() {
            self.pre_sort();
        }

        let frames_count = (self.operations.len() as f32 / (60.0 * seconds as f32)).ceil() as u16;

        for _ in 1..=frames_count {
            if !self.tick() {
                return false;
            }
        }

        true
    }

    pub fn size(&self) -> usize {
        self.size
    }

    pub fn values(&self) -> Uint16Array {
        unsafe { Uint16Array::view(self.array.get_values()) }
    }

    pub fn operation(&self) -> JsValue {
        if self.current_operation == 0 || self.operations.is_empty() {
            return JsValue::NULL;
        }

        serde_wasm_bindgen::to_value(&self.operations[self.current_operation - 1]).unwrap()
    }

    pub fn reads(&self) -> usize {
        self.array.get_reads()
    }

    pub fn writes(&self) -> usize {
        self.array.get_writes()
    }

    pub fn compares(&self) -> usize {
        self.array.get_compares()
    }

    pub fn swaps(&self) -> usize {
        self.array.get_swaps()
    }
}
