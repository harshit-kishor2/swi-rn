import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import branch from 'react-native-branch';

const DeepLinkng = () => {

  useEffect(() => {
    const fetchData = async () => {
      branch.subscribe({
        onOpenStart: ({ uri, cachedInitialEvent }) => { },
        onOpenComplete: data => {
          console.log('Response a long with error ->>', data);
        },
      });

      let lastParams = await branch.getLatestReferringParams();
      console.log('lastParams ->>', lastParams);
      let installParams = await branch.getFirstReferringParams();
      console.log('installParams ->>', installParams);
    };

    fetchData();

  }, [])
  return null;
};

export default DeepLinkng;

const styles = StyleSheet.create({});
