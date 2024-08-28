import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

const SortOptionsModal = ({visible, onClose, onSelectOption}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['relevancy', 'popularity', 'publishedAt'];
  const handleOptionSelect = option => {
    onSelectOption(option);
    setSelectedOption(option);
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
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Sort</Text>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleOptionSelect('')}>
              <Icon name="close" size={20} color={theme.color.primary} />
            </TouchableOpacity>
          </View>
          {selectedOption && (
            <TouchableOpacity
              // activeOpacity={1}
              style={{alignItems: 'flex-end'}}
              onPress={() => handleOptionSelect('')}>
              <Text style={styles.subModalTitle}>Clear sorting</Text>
            </TouchableOpacity>
          )}
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.optionContainer}
              onPress={() => handleOptionSelect(option)}>
              <Text style={styles.optionText}>{option}</Text>
              {selectedOption === option && (
                <Icon name="checkmark" size={20} color={theme.color.primary} />
              )}
            </TouchableOpacity>
          ))}
          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
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
    marginBottom: 20,
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
  closeButton: {
    marginTop: 20,
    backgroundColor: theme.color.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SortOptionsModal;
