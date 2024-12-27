// ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Modal,
  Button,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImageViewing from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/Ionicons';
import auth, { signOut } from '@react-native-firebase/auth';


const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    phone: '+1 234 567 8900',
  });


  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    nutFree: false,
    spicyFood: true,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleImageCrop = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setProfileImage(image.path);
    });
  };

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleUpdateProfile = () => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const renderImageOptionsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showImageOptions}
      onRequestClose={() => setShowImageOptions(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.modalOption}
            onPress={() => {
              handleImagePicker();
              setShowImageOptions(false);
            }}
          >
            <Icon name="images-outline" size={24} color="#333" />
            <Text style={styles.modalOptionText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.modalOption}
            onPress={() => {
              handleImageCrop();
              setShowImageOptions(false);
            }}
          >
            <Icon name="crop-outline" size={24} color="#333" />
            <Text style={styles.modalOptionText}>Crop Image</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.modalOption, styles.cancelOption]}
            onPress={() => setShowImageOptions(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );



  return (
    <ScrollView style={styles.container}>
        <Button title="Logout" color={'green'} onPress={() => auth().signOut()} />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setIsImageViewVisible(true)}
          onLongPress={() => setShowImageOptions(true)}
        >
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon name="person-outline" size={40} color="#666" />
              </View>
            )}
            <View style={styles.editIconContainer}>
              <Icon name="camera-outline" size={20} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={profileData.firstName}
            onChangeText={(text) => setProfileData({ ...profileData, firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={profileData.lastName}
            onChangeText={(text) => setProfileData({ ...profileData, lastName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={profileData.email}
            onChangeText={(text) => setProfileData({ ...profileData, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={profileData.location}
            onChangeText={(text) => setProfileData({ ...profileData, location: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={profileData.phone}
            onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Food Preferences</Text>
        <View style={styles.preferencesContainer}>
          {Object.entries(preferences).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={[styles.preferenceItem, value && styles.preferenceItemActive]}
              onPress={() => togglePreference(key)}
            >
              <Icon 
                name={value ? 'checkbox' : 'square-outline'} 
                size={24} 
                color={value ? '#4CAF50' : '#666'} 
              />
              <Text style={[styles.preferenceText, value && styles.preferenceTextActive]}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateProfile}
      >
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>

      {renderImageOptionsModal()}

      <ImageViewing
        images={[{ uri: profileImage }]}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputGroup: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  preferencesContainer: {
    gap: 10,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  preferenceItemActive: {
    backgroundColor: '#e8f5e9',
  },
  preferenceText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#666',
  },
  preferenceTextActive: {
    color: '#4CAF50',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  cancelOption: {
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;