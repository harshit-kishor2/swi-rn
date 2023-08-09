import { COLORS } from '@app/resources';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterModal = ({ visible, onClose, onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        onFilterChange(filter);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={[styles.filterOption, selectedFilter === 'high' && styles.selectedFilter]}
                        onPress={() => handleFilterChange('high')}
                    >
                        <Text style={styles.filterText}>High</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterOption, selectedFilter === 'low' && styles.selectedFilter]}
                        onPress={() => handleFilterChange('low')}
                    >
                        <Text style={styles.filterText}>Low</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterOption: {
        padding: 10,
    },
    selectedFilter: {
        // backgroundColor: '#007AFF',
        backgroundColor: COLORS.APPGREEN,
        borderRadius: 5,
    },
    filterText: {
        fontSize: 16,
        color: 'white',
    },
});

export default FilterModal;
