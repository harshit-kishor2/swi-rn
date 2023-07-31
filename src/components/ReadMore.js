import {COLORS, SPACING} from '@app/resources';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ReadMore = ({content, maxCharacters = 50}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleShowContent = () => {
    setShowFullContent(!showFullContent);
  };

  const truncatedContent = content?.substring(0, maxCharacters);
  const displayContent = showFullContent ? content : truncatedContent + '...';

  return (
    <View>
      <Text style={styles.contentText}>{displayContent}</Text>
      {content?.length > maxCharacters && (
        <TouchableOpacity onPress={toggleShowContent}>
          <Text style={styles.readMoreText}>
            {showFullContent ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  readMoreText: {
    color: COLORS.APPGREEN,
    marginTop: SPACING.SCALE_5,
    textDecorationLine: 'underline',
    fontSize: SPACING.SCALE_15,
  },
});

export default ReadMore;
