import React from 'react';
import {Image, StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const ProfileImage = ({identifier, size}) => {
  // Generate a random profile image URL using RoboHash
  const imageUrl = `https://robohash.org/${encodeURIComponent(identifier)}.png`;

  return (
    <Image
      style={[
        styles.profileImage,
        {width: size, height: size, borderRadius: size / 2},
      ]}
      source={{uri: imageUrl}}
    />
  );
};

const styles = StyleSheet.create({
  profileImage: {
    backgroundColor: theme.color.accent,
  },
});

export default ProfileImage;
