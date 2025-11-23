import { StyleSheet } from "react-native";

export const ColorTheme = {
  first: "#F8F9FA",
  second: "#DEE2E6",
  third: "rgba(0, 0, 0, 0.7)",
  fourth: "#5CA4A9",
  fifth: "#9BC4BC",
  sixth: "#a6cbc3ff",
  seventh: "#212529",
  error: "#FF6B6B",
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
    color: ColorTheme.first,
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
    backgroundColor: ColorTheme.seventh,
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
    borderWidth: 1,
    borderColor: ColorTheme.fourth,
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: ColorTheme.fourth,
  },
  radioLabel: {
    fontSize: 16,
  },
  errorText: {
    color: ColorTheme.error,
    marginTop: 0,
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
  button: {
    width:'95%',
    borderRadius: 200, 
    height:'7%',
    backgroundColor: ColorTheme.fourth,
    alignItems:'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize:18, 
    color:ColorTheme.first,
    fontWeight: 'bold',
  },
});
