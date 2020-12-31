export const wordLimit = (paragraph: string): string => {
  const arr = paragraph.split(' ');
  let ret = '';
  for (let i = 0; i < 50; i++){
    if (arr[i] && i < arr.length - 1) {
      ret += `${arr[i]} `
    }
  }
  return `${ret}...`;
}