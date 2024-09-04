import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment'; 
import theme from '../../styles/theme';
import globalStyles from '../../styles/GlobalStyles';

const SortOptionsModal = ({visible, onClose, onSelectOption}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDateFormatted, setFromDateFormatted] = useState(null);
  const [toDateFormatted, setToDateFormatted] = useState(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const today = new Date();
  const options = ['relevancy', 'popularity', 'publishedAt'];

  const handleOptionSelect = option => {
    onSelectOption(option, fromDateFormatted, toDateFormatted);
    setSelectedOption(option);
    onClose();
  };

  const handleClear = () => {
    setSelectedOption('');
    setFromDate(null);
    setToDate(null);
    onSelectOption('', '', '');
    onClose();
  };

  const handleFromDateChange = (event, date) => {
    setShowFromDatePicker(false);
    if (date) {
      setFromDate(date);
       setFromDateFormatted(moment(date).format('YYYY-MM-DD'));
    }
  };

  const handleToDateChange = (event, date) => {
    setShowToDatePicker(false);
    if (date) {
      setToDate(date);
      setToDateFormatted(moment(date).format('YYYY-MM-DD'));
    }
  };

  const handleFilterData = () => { 
    onSelectOption(selectedOption, fromDateFormatted, toDateFormatted);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Sort </Text>
              <TouchableOpacity activeOpacity={1} onPress={handleClear}>
                <Icon name="close" size={20} color={theme.color.primary} />
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: '5%'}}>
              <Text>Choose a sort option</Text>
            </View>
            {(selectedOption || fromDate || toDate) && (
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={handleClear}>
                <Text style={styles.subModalTitle}>
                  Clear sorting & filtering
                </Text>
              </TouchableOpacity>
            )}

            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.optionContainer}
                onPress={() => handleOptionSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
                {selectedOption === option && (
                  <Icon
                    name="checkmark"
                    size={20}
                    color={theme.color.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
            <View style={styles.secondModalTitleContainer}>
              <Text style={styles.modalTitle}>Filter</Text>
            </View>
            <View style={{marginBottom: '5%'}}>
              <Text>Select from & to date to filter</Text>
            </View>
            <View style={styles.dateFilterContainer}>
              <TouchableOpacity
                onPress={() => setShowFromDatePicker(true)}
                style={styles.dateButton}>
                <Text style={styles.optionText}>
                  From:{' '}
                  {fromDate
                    ? moment(fromDate).format('YYYY-MM-DD')
                    : 'Select Date'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowToDatePicker(true)}
                style={styles.dateButton}>
                <Text style={styles.optionText}>
                  To:{' '}
                  {toDate ? moment(toDate).format('YYYY-MM-DD') : 'Select Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.button, {marginTop: 20}]}
                onPress={() => handleFilterData()}>
                <Text style={globalStyles.buttonText}>Filter By</Text>
              </TouchableOpacity>
            </View>
            {showFromDatePicker && (
              <DateTimePicker
                value={fromDate || new Date()}
                mode="date"
                display="default"
                maximumDate={today}
                onChange={handleFromDateChange}
              />
            )}

            {showToDatePicker && (
              <DateTimePicker
                value={toDate || new Date()}
                mode="date"
                display="default"
                maximumDate={today}
                onChange={handleToDateChange}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondModalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: theme.fonts.bold,
    color: theme.color.primary,
  },
  subModalTitle: {
    fontSize: 16,
    fontWeight: theme.fonts.bold,
    color: theme.color.accent,
    marginVertical: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  dateFilterContainer: {
    marginBottom: '5%',
  },
  dateButton: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    marginVertical: 5,
  },
});

export default SortOptionsModal;