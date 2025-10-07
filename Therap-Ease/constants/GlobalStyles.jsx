import { StyleSheet } from "react-native";

export const ColorTheme = {
  first: "#FFF2EF",
  second: "#FFDBB6",
  third: "#f7a5a5",
  fourth: "#a47da0",
  fifth: "#5D688A",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: ColorTheme.first,
    padding: 8,
    alignItems: "center",
  },
  paragraph: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: ColorTheme.second,
  },
  actionButton: {
    backgroundColor: ColorTheme.fifth,
    width: "70%",
    borderRadius: 10,
    paddingVertical: 10,
  },
  formContainer: {
    width: "70%",
    overflow: "hidden",
    marginTop: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: ColorTheme.fourth,
  },
  submitButton: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  submitText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: "green",
  },
  radioLabel: {
    fontSize: 16,
  },
  errorText: {
    color: ColorTheme.third,
    marginTop: 2,
    marginBottom: 5,
    fontSize: 12,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: ColorTheme.first,
  },
});
