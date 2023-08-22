import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { detailMovies } from '../api';
import YoutubePlayer from 'react-native-youtube-iframe';
import Card from '../components/Card';
import Ionicons from '@expo/vector-icons/Ionicons';

import SearchBar from '../components/SearchBar';

export default function Movie({ navigation, route }) {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [casts, setCasts] = useState("");
  const [trailer, setTrailer] = useState("");
  const { movieId } = route.params;

  const detailMovie = async () => {
    try {
      const movieData = await detailMovies(movieId);
      const trailerData = await detailMovies(movieId + '/videos');
      const castsData = await detailMovies(movieId + '/casts');
      setCasts(castsData);
      setMovie(movieData);
      setTrailer(trailerData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  useEffect(() => {
    detailMovie();

  }, []);

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        trailer == "" ?
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center'
          }}>

            <ActivityIndicator size="large" />
            <Text style={{ color: 'white', marginTop: 20 }}>Memuat Film Buat Kamu...</Text>
          </View> :
          <View>
            <YoutubePlayer
              height={300}
              videoId={trailer.results != "" ? trailer.results.filter(item => item.type === "Trailer")[0].key : ""}
            />
            <View style={{
              marginTop: -60,
              paddingHorizontal: 10,
            }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}
              >{movie.title}</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  textAlign: 'justify',
                  marginVertical: 10
                }}
              >
                {movie.overview}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      textAlign: 'justify',
                      fontWeight: 'bold'
                    }}
                  >Budget</Text>
                  <Text style={{ color: 'white' }}>{movie.budget == 0 ? "unknown" : currencyFormat(parseInt(movie.budget))}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      textAlign: 'justify',
                      fontWeight: 'bold'
                    }}
                  >Vote Average</Text>
                  <Text style={{ color: 'white' }}>{movie.vote_average}</Text>
                </View>


                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      textAlign: 'justify',
                      fontWeight: 'bold',
                    }}
                  >Release Date</Text>
                  <Text style={{ color: 'white' }}>{movie.release_date}</Text>
                </View>
              </View>

              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                  marginTop: 10
                }}
              >Cast</Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 100 }}>
                {
                  casts == undefined ?
                    <ActivityIndicator size="large" />
                    :
                    casts.cast.slice(0, 6).map((actor, index) => (
                      <Card style={{ width: 70 }}
                        key={index}
                        title={actor.name}
                        movieId={actor.id}
                        thumbnail_url={actor.profile_path}
                        score={actor.popularity}
                        width={115}
                        height={115}
                      />
                    ))}
              </View>


            </View>

          </View>
      }




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'start',
    color: 'white',
    padding: 5,
    backgroundColor: '#121212'
  },
});
