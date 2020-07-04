export default {
  user: {
    loggedIn: false,
    data: null,
    premium: false,
    admin: false,
    uid: "",
    syncedLists: [],
  },
  savedLinks: [],
  newItem: "",
  todo: [],
  todoName: "Todo List",
  todoListID: "",
  tempID: "",
  title: "",
  titleColor: "#313639",
  newTitleColor: "",
  currentTime: "",
  imgError: "",
  listIndex: 0,
  imagesUploaded: 0,
  uploadDialog: false,
  viewImg: false,
  existingList: false,
  loading: false,
  saving: false,
  colorPickerDialog: false,
  notEditing: true,
  infoPanel: true,
  editItem: false,
  accountPanel: false,
  forgotDialog: false,
  sentDialog: false,
  paymentDialog: false,
  syncedListsLoading: false,
  rules: {
    required: value => !!value || "Required.",
    counterMin3: value =>
      value.length >= 3 || "Your list name has to have at least 3 characters",
    counterMax25: (value) =>
      value.length <= 25 || "Your list name can only be up to 25 characters",
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Please enter a valid email address";
    },
  },
    counterMax25: value =>
      value.length <= 25 || "Your list name can only be up to 25 characters"
  }
};
