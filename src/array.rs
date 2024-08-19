use crate::operation::Operation;

pub struct Array {
    values: Vec<u16>,
    reads: usize,
    writes: usize,
    compares: usize,
    swaps: usize,
}

impl Array {
    pub fn new(size: usize) -> Self {
        let mut values = Vec::with_capacity(size);

        for i in 1..=size as u16 {
            values.push(i);
        }

        Self {
            values,
            reads: 0,
            writes: 0,
            compares: 0,
            swaps: 0,
        }
    }

    pub fn get_values(&self) -> &[u16] {
        self.values.as_ref()
    }

    pub fn get_reads(&self) -> usize {
        self.reads
    }

    pub fn get_writes(&self) -> usize {
        self.writes
    }

    pub fn get_compares(&self) -> usize {
        self.compares
    }

    pub fn get_swaps(&self) -> usize {
        self.swaps
    }

    pub fn reset_stats(&mut self) {
        self.reads = 0;
        self.writes = 0;
        self.compares = 0;
        self.swaps = 0;
    }

    pub fn apply(&mut self, operation: &Operation) {
        match *operation {
            Operation::Read(_) => {
                self.reads += 1;
            }
            Operation::Write(index, value) => {
                self.writes += 1;
                self.values[index] = value;
            }
            Operation::Compare => {
                self.compares += 1;
            }
            Operation::Swap => {
                self.swaps += 1;
            }
        }
    }
}
