import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { auth, firebaseConfig } from '../config/firebaseConfig';
import { PhoneAuthProvider } from 'firebase/auth';

const PhoneVerification = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');

  const sendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      setError('SEND VERIFICATION CODE: ' + err.message);
      console.log(err);
    }
  };

  const verifyPhoneNumber = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await auth.signInWithCredential(credential);
      navigation.navigate('DailyCard');
    } catch (err) {
      setError('VERIFY PHONE NUMBER: ' + err.message);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.title}>Phone Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      {verificationId ? (
        <TextInput
          style={styles.input}
          placeholder="Verification code"
          onChangeText={setVerificationCode}
          value={verificationCode}
          keyboardType="number-pad"
        />
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!verificationId ? (
        <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
          <Text style={styles.buttonText}>Send Verification Code</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={verifyPhoneNumber}>
          <Text style={styles.buttonText}>Verify Phone Number</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#00f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 10 },
});

export default PhoneVerification;
