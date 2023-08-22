import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMovies,searchMovies } from '../api';
import Header from '../components/Header';


import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchMovies = async () => {
      try {
          const moviesData = await getMovies('movies');
          const TvData = await getMovies('tv');
          setMovies(moviesData);
          setTv(TvData);
          setLoading(false);
      
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };


  const handleSearch = async (search) => {
    try {
      setLoading(true);
      const moviesData = await searchMovies(search);
      setMovies(moviesData);
      setLoading(false);
      
  } catch (error) {
      console.error('Error fetching movies:', error);
  }
  };


  useEffect(() => {
    fetchMovies();
}, []);

  return (
    <SafeAreaView style={styles.container}>
        <SearchBar placeholder="Mau Nonton Apa Nih..."
        onChangeVal={val=>setSearch(val)}
        handleSearch={()=>handleSearch(search)}
        />

        {
          loading ?
          (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf:'center'
            }}>
              <ActivityIndicator size="large" />
              <Text style={{color:'white',marginTop:20}}>Movie</Text>
            </View>
          ):(
            <View>
              <Header/>
      <Text style={{color:'white',fontSize:16,fontWeight:'bold', margin:10}}>Movies</Text>

      {/* vertical */}
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View style={{flexDirection:'row',flexWrap:'wrap',gap:5, justifyContent:'center',marginBottom:100,paddingBottom:200}}>
      {movies.results.map(movie => (
                  // <Text style={{color:"white"}} key={movie.id}>{movie.title}</Text>
                  <Card 
                  key={movie.id} 
                  title={movie.original_title}
                  movieId={movie.id} 
                  thumbnail_url={movie.poster_path}
                  score={movie.vote_average}
                  width={110}
                  height={160}
                  />
                ))}
      </View>
        
      </ScrollView>
      </View>
          )
        }
      
      
                
            
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    color: 'white',
    backgroundColor :'#121212'
  },
});
