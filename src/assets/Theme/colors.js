export const COLORS = {
  primary: '#1F2732',
  secondary: '#E6936B',
  light_primary: '#E2F7EB',
  white: '#fff',
  black: '#000',
  dark: '#19122e',
  track: '#F7EFE5',
  card: '#707070',
  home_bg: '#F0F0F0',
};

const COLORS_SETS = {
  2: ['#CCE6F6', '#DDE6E1', '#E9D783', '#D1E9F6', '#CCD5AE'],
  4: [
    '#CCE6F6',
    '#E9D783',
    '#CCD5AE',
    '#6482AD',
    '#FFDFD6',
    '#987D9A',
    '#D6EFD8',
    '#C9DABF',
  ],
  8: [
    '#E9D783',
    '#4AA4BA80',
    '#DDE6E1',
    '#C0C0C0',
    '#0000001A',
    '#F5F6FA',
    '#0000000D',
    '#E6936B40',
    '#CCE6F6',
  ],
};

export const get_bg_color = (index = Math.random(), split_index) => {
  let new_colors = COLORS_SETS[split_index];
  let colors = [...new Set(new_colors)];
  let indexArr = index.toString().split('');
  return colors[indexArr[indexArr.length - 1]];
};
