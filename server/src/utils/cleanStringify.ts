// https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
export default function cleanStringify(object: any) {
  if (object && typeof object === "object") {
    object = copyWithoutCircularReferences([object], object);
  }
  return JSON.stringify(object);

  function copyWithoutCircularReferences(references: any, object: any) {
    var cleanObject = {} as any;
    Object.keys(object).forEach(function (key) {
      var value = object[key];
      if (value && typeof value === "object") {
        if (references.indexOf(value) < 0) {
          references.push(value);
          cleanObject[key] = copyWithoutCircularReferences(references, value);
          references.pop();
        } else {
          cleanObject[key] = "###_Circular_###";
        }
      } else if (typeof value !== "function") {
        cleanObject[key] = value;
      }
    });
    return cleanObject;
  }
}
