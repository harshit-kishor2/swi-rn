import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { BackHeader, Container, Spacer } from '@app/components'
import { Title } from 'react-native-paper'
import PageTitle from '@app/screens/atoms/PageTitle'
import { connect } from 'react-redux'
import { aboutListingAction } from '@app/store/ratingReviewSlice'
import WebView from 'react-native-webview'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'
import { LoadingStatus } from '@app/helper/strings'

const About = (props) => {
    const { getAbout, ratingReviewReducer, authReducer } = props;

    useEffect(() => {
        getAbout({ key: 'about-us' })
    }, [])

    console.log(ratingReviewReducer, 'sdfghjklkhgfghjhgfghjkjgf')
    const Data = props?.ratingReviewReducer?.aboutListingAction?.data;
    console.log(Data, "propsValue============>>>>>>>>>>>>>")
    return (
        <Container useSafeAreaView={true} style={{ flex: 1, }} loading={
            ratingReviewReducer.aboutListingActionLoadingStatus ==
            LoadingStatus.LOADING}>
            <Spacer height={20} />
            <BackHeader />
            <PageTitle title={Data?.subject} />
            <View style={{ marginHorizontal: 20, flex: 1 }}>

                {/* 
                <WebView
                    source={{ html: `<style>body { font-size: 40px; }</style>${Data?.message}` }}
                    // source={{ html: Data?.message }}
                    style={{ marginTop: 20, }}
                    javaScriptEnabled={true}
                /> */}
                <AutoHeightWebView
                    style={{ width: Dimensions.get('window').width - 15, }}
                    customScript={`document.body.style.background = 'white';`}
                    customStyle={`
      * {
        font-family: 'Times New Roman';
      }
      p {
        font-size: 16px;
      }
    `}
                    onSizeUpdated={size => console.log(size.height)}
                    files={[{
                        href: 'cssfileaddress',
                        type: 'text/css',
                        rel: 'stylesheet'
                    }]}
                    // source={{ html: `<p style="font-weight: 400;font-style: normal;font-size: 21px;line-height: 1.58;letter-spacing: -.003em;">Tags are great for describing the essence of your story in a single word or phrase, but stories are rarely about a single thing. <span style="background-color: transparent !important;background-image: linear-gradient(to bottom, rgba(146, 249, 190, 1), rgba(146, 249, 190, 1));">If I pen a story about moving across the country to start a new job in a car with my husband, two cats, a dog, and a tarantula, I wouldn’t only tag the piece with “moving”. I’d also use the tags “pets”, “marriage”, “career change”, and “travel tips”.</span></p>` }}
                    source={{ html: `${Data?.message}` }}
                    scalesPageToFit={true}
                    viewportContent={'width=device-width, user-scalable=no'}
                /*
                other react-native-webview props
                */
                />

            </View>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        authReducer: state.authReducer,
        ratingReviewReducer: state.ratingReviewReducer,
    };
};
const mapDispatchToProps = dispatch => ({
    getAbout: params => dispatch(aboutListingAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);