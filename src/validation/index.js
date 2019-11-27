import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", { ...required, message: "This field is required!" });

extend("min_value", {
  validate(value, args) {
    this.message = `Value must be greater than ${args}`;
    return value >= args;
  }
});
