import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/core/Header';
import {COLORS} from '../../assets/Theme/colors';
import Change_Language from '../../components/core/ChangeLanguage';
import i18n, {trasnlate} from '../../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useDispatch, useSelector} from 'react-redux';
import {request_home_screenData} from '../../Redux/Actions/publicData';
import {getHomeScreenData} from '../../Redux/Selectors/publicHomeData';
import {CLoader} from '../../components/core/CLoader';
import HomeTopStore from './HomeTopStore';
import HomePopularStore from './HomePopularStore';

function Home({navigation}) {
  const [language, setLanguage] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(getHomeScreenData);
  const loading = useSelector(state => state.params.loading);

  useEffect(() => {
    loadLanguage();
    dispatch(request_home_screenData());
  }, [dispatch]);

  const loadLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem('appLanguage');
    if (storedLanguage) {
      i18n.locale = storedLanguage;
      setLanguage(storedLanguage === 'en' ? false : true);
    } else {
      i18n.locale = 'en';
    }
  };

  const selectLang = async () => {
    const newLanguage = language ? 'en' : 'hi';
    setLanguage(!language);
    i18n.locale = newLanguage ? newLanguage : 'en';
    await AsyncStorage.setItem('appLanguage', newLanguage);
  };

  const renderCategory = ({item, index}) => {
    let newData = Object.values(item);

    switch (newData[0].blockName) {
      case 'procash/featured-stores':
        return <HomeTopStore item={newData[0]} />;
      case 'procash/top-stores':
        return <HomePopularStore item={newData[0]} />;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Home'}
        component={
          <Change_Language
            value={language}
            onValueChange={selectLang}
            trackColor={{
              true: COLORS.track,
              false: COLORS.track,
            }}
            thumbColor={COLORS.secondary}
          />
        }
      />
      <View style={styles.inner_container}>
        <FlatList data={data} renderItem={renderCategory} />
      </View>
      {loading && <CLoader />}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inner_container: {
    flex: 1,
    marginHorizontal: 20,
  },
  button: {
    width: '50%',
  },
  usernumber: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.black,
  },
  logintitle: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 30,
  },
});

// const [isVisible, setIsVisible] = useState(false);
{
  /* <CButton title={'Next'} onPress={() => navigation.navigate('Profile')} /> */
}
{
  /* <CButton
  title={trasnlate('logout')}
  extrasty={styles.button}
  onPress={() => setIsVisible(true)}
  /> */
}
{
  /* <LogoutModal
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        onPressLogout={onPressLog}
      /> */
}
// const [userInfo, setUserInfo] = useState('');

// useEffect(() => {
//   getUserInfo();
// }, []);

// const getUserInfo = async () => {
//   console.log('Get User');
//   let data = await getAsyncData('USERINFO');
//   setUserInfo(data);
// };

// const onPressLog = async () => {
//   await setAsyncData('ISverified', (isVerify = false));
//   clearAsyncData('USER_AUTH');
//   // clearAsyncData('USERINFO');
//   navigation.navigate('Login');
//   setIsVisible(false);
// };
// import {
//   clearAsyncData,
//   getAsyncData,
//   setAsyncData,
// } from '../../assets/Utils/asyncstorage';
// import {LogoutModal} from '../../components/core/LogoutModal';
