export default {
  newItem: "",
  todo: [],
  todoName: "Todo List",
  todoListID: "",
  tempID: "",
  title: "",
  titleColor: "#313639",
  newTitleColor: "",
  editDialog: false,
  uploadImage: false,
  existingList: false,
  loading: false,
  saving: false,
  colorPickerDialog: false,
  notEditing: true,
  rules: {
    required: (value) => !!value || "Required.",
    counterMin3: (value) =>
      value.length >= 3 || "Your list name has to have at least 3 characters",
    counterMax25: (value) =>
      value.length <= 25 || "Your list name can only be up to 25 characters",
  },
};
