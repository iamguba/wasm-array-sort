use crate::Sorting;

pub struct BubbleSort;
pub struct CocktailSort;
pub struct SelectionSort;
pub struct InsertionSort;
pub struct GnomeSort;
pub struct CycleSort;
pub struct HeapSort;
pub struct ShellSort;
pub struct OddEvenSort;
pub struct QuickSort;

pub trait SortAlgorithm {
    fn sort(s: &mut Sorting);
}

impl SortAlgorithm for BubbleSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();

        loop {
            let mut has_swapped = false;

            for i in 0..size - 1 {
                if s.pre_greater(i, i + 1) {
                    s.pre_swap(i, i + 1);
                    has_swapped = true;
                }
            }

            if !has_swapped {
                break;
            }
        }
    }
}

impl SortAlgorithm for CocktailSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();

        loop {
            let mut has_swapped = false;

            for i in 0..size - 1 {
                if s.pre_greater(i, i + 1) {
                    s.pre_swap(i, i + 1);
                    has_swapped = true;
                }
            }

            if !has_swapped {
                break;
            }

            for i in (1..size).rev() {
                if s.pre_greater(i - 1, i) {
                    s.pre_swap(i - 1, i);
                    has_swapped = true;
                }
            }

            if !has_swapped {
                break;
            }
        }
    }
}

impl SortAlgorithm for SelectionSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();

        for i in 0..size - 1 {
            let mut min_index = i;

            for j in i + 1..size {
                if s.pre_greater(min_index, j) {
                    min_index = j;
                }
            }

            if min_index != i {
                s.pre_swap(i, min_index);
            }
        }
    }
}

impl SortAlgorithm for InsertionSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();

        for i in 1..size {
            let mut j = i;
            while j > 0 && s.pre_greater(j - 1, j) {
                s.pre_swap(j - 1, j);
                j -= 1;
            }
        }
    }
}

impl SortAlgorithm for GnomeSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();
        let mut index = 0;

        while index < size {
            if index == 0 || !s.pre_greater(index - 1, index) {
                index += 1;
            } else {
                s.pre_swap(index - 1, index);
                index -= 1;
            }
        }
    }
}

impl SortAlgorithm for CycleSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();

        for cycle_start in 0..size - 1 {
            let mut item = s.pre_read(cycle_start);
            let mut pos = cycle_start;

            for i in cycle_start + 1..size {
                if s.pre_less(i, cycle_start) {
                    pos += 1;
                }
            }

            if pos == cycle_start {
                continue;
            }

            while s.pre_equal(pos, cycle_start) {
                pos += 1;
            }

            if pos != cycle_start {
                s.pre_swap(pos, cycle_start);
            }

            while pos != cycle_start {
                pos = cycle_start;

                for i in cycle_start + 1..size {
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
    }
}

impl SortAlgorithm for HeapSort {
    fn sort(s: &mut Sorting) {
        fn heapify(s: &mut Sorting, n: usize, i: usize) {
            let mut largest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if left < n && s.pre_greater(left, largest) {
                largest = left;
            }

            if right < n && s.pre_greater(right, largest) {
                largest = right;
            }

            if largest != i {
                s.pre_swap(i, largest);
                heapify(s, n, largest);
            }
        }

        let size = s.size();

        for i in (0..size / 2).rev() {
            heapify(s, size, i);
        }

        for i in (1..size).rev() {
            s.pre_swap(0, i);
            heapify(s, i, 0);
        }
    }
}

impl SortAlgorithm for ShellSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();
        let mut gap = size / 2;

        while gap > 0 {
            for i in gap..size {
                let mut j = i;
                while j >= gap && s.pre_greater(j - gap, j) {
                    s.pre_swap(j - gap, j);
                    j -= gap;
                }
            }
            gap /= 2;
        }
    }
}

impl SortAlgorithm for OddEvenSort {
    fn sort(s: &mut Sorting) {
        let size = s.size();
        let mut sorted = false;

        while !sorted {
            sorted = true;

            for i in (1..size - 1).step_by(2) {
                if s.pre_greater(i, i + 1) {
                    s.pre_swap(i, i + 1);
                    sorted = false;
                }
            }

            for i in (0..size - 1).step_by(2) {
                if s.pre_greater(i, i + 1) {
                    s.pre_swap(i, i + 1);
                    sorted = false;
                }
            }
        }
    }
}

impl SortAlgorithm for QuickSort {
    fn sort(s: &mut Sorting) {
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

        let size = s.size();
        if size > 0 {
            quick_sort_recursive(s, 0, size - 1);
        }
    }
}
