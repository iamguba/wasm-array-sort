use crate::algorithms::{
    BubbleSort, CocktailSort, CycleSort, GnomeSort, HeapSort, InsertionSort, OddEvenSort,
    QuickSort, SelectionSort, ShellSort, SortAlgorithm,
};
use crate::array::Array;
use crate::operation::Operation;
use crate::utils::set_panic_hook;

use js_sys::Uint16Array;
use wasm_bindgen::prelude::*;

use rand::Rng;
use std::cmp::Ordering;

/** Struct */
#[wasm_bindgen]
pub struct Sorting {
    array: Array,
    size: usize,
    pre_sort_array: Vec<u16>,
    algo: fn(&mut Self),
    operations: Vec<Operation>,
    current_operation: usize,
}

/** Contructor and getters */
#[wasm_bindgen]
impl Sorting {
    pub fn new(size: usize) -> Self {
        set_panic_hook();

        Self {
            array: Array::new(size),
            size,
            pre_sort_array: Vec::with_capacity(size),
            algo: |_| {},
            operations: vec![],
            current_operation: 0,
        }
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

/** Render getters */
#[wasm_bindgen]
impl Sorting {
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

    #[wasm_bindgen(js_name = resetStats)]
    pub fn reset_stats(&mut self) {
        self.array.reset_stats();
    }
}

/** Algorithms and shufflers */
#[wasm_bindgen]
impl Sorting {
    pub fn bubble(&mut self) {
        self.set_algo(|s| BubbleSort::sort(s));
    }

    pub fn selection(&mut self) {
        self.set_algo(|s| SelectionSort::sort(s));
    }

    pub fn cocktail(&mut self) {
        self.set_algo(|s| CocktailSort::sort(s));
    }

    pub fn insertion(&mut self) {
        self.set_algo(|s| InsertionSort::sort(s));
    }

    pub fn gnome(&mut self) {
        self.set_algo(|s| GnomeSort::sort(s));
    }

    pub fn cycle(&mut self) {
        self.set_algo(|s| CycleSort::sort(s));
    }

    pub fn heap(&mut self) {
        self.set_algo(|s| HeapSort::sort(s));
    }

    pub fn shell(&mut self) {
        self.set_algo(|s| ShellSort::sort(s));
    }

    #[wasm_bindgen(js_name = oddEven)]
    pub fn odd_even(&mut self) {
        self.set_algo(|s| OddEvenSort::sort(s));
    }

    #[wasm_bindgen(js_name = quickSort)]
    pub fn quick_sort(&mut self) {
        self.set_algo(|s| QuickSort::sort(s));
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
}

/** Helpers */
impl Sorting {
    fn set_algo(&mut self, algo: fn(&mut Self)) {
        self.algo = algo;
        self.operations = vec![];
        self.current_operation = 0;
        self.reset_stats();
    }

    pub fn pre_sort(&mut self) {
        self.pre_sort_array
            .extend_from_slice(self.array.get_values());

        (self.algo)(self);

        self.pre_sort_array.clear();
    }

    pub fn pre_read(&mut self, index: usize) -> u16 {
        self.operations.push(Operation::Read(index));
        self.pre_sort_array[index]
    }

    pub fn pre_write(&mut self, index: usize, value: u16) {
        self.operations.push(Operation::Write(index, value));
        self.pre_sort_array[index] = value;
    }

    pub fn pre_swap(&mut self, left_index: usize, right_index: usize) {
        let left = self.pre_read(left_index);
        let right = self.pre_read(right_index);

        self.pre_write(left_index, right);
        self.pre_write(right_index, left);

        self.operations.push(Operation::Swap);
    }

    pub fn pre_compare(&mut self, left_index: usize, right_index: usize) -> Ordering {
        let left = self.pre_read(left_index);
        let right = self.pre_read(right_index);

        self.operations.push(Operation::Compare);
        left.cmp(&right)
    }

    pub fn pre_greater(&mut self, left_index: usize, right_index: usize) -> bool {
        self.pre_compare(left_index, right_index) == Ordering::Greater
    }

    pub fn pre_less(&mut self, left_index: usize, right_index: usize) -> bool {
        self.pre_compare(left_index, right_index) == Ordering::Less
    }

    pub fn pre_equal(&mut self, left_index: usize, right_index: usize) -> bool {
        self.pre_compare(left_index, right_index) == Ordering::Equal
    }
}
