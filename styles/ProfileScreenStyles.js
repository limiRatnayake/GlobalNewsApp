import { StyleSheet } from "react-native";
import theme from "./theme";

const profileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: theme.padding.mainPadding,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: theme.color.black,
    fontFamily: theme.fonts.bold,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  logoutButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default profileScreenStyles;
