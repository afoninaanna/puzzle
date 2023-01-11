export const shuffle = (a) => {
  const b = a.slice();

  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }

  return b;
};

export const shuffleTriangle = (a) => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i % 2 && j % 2) {
      [b[i], b[j]] = [b[j], b[i]];
    } else if (!(i % 2) && !(j % 2)) {
      [b[i], b[j]] = [b[j], b[i]];
    }
  }
  return b;
};

export const isEqual = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};
