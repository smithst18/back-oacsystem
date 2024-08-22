export const camelize = (str:String):string => {
  return str.replace(/\b\w/g, function(word: string) {
    return word.toUpperCase();
  });
}