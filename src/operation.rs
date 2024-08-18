use serde::{Serialize};

#[derive(Clone, Copy, Serialize)]
pub enum Operation {
  Read(usize),
  Write(usize, u16),
  Compare,
  Swap,
}