import {React,useState} from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Card({title,thumbnail_url,score,movieId,width,height}) {
  const [movie, setMovie] = useState([]);
  
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={() =>{
      navigation.navigate('Movie',{
        movieId:movieId
      })
        // detailMovie()
    }
        
      }
    >
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://image.tmdb.org/t/p/original'+thumbnail_url }}
        borderRadius={10}
        style={styles.imageShadow}
        Cover
        height={height}
        width={width}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={{
          flex:1,
          flexDirection:'row',
          gap:2
        }}>
        <Ionicons name="md-star" size={13} color="yellow" />
        <Text style={styles.score}>{score}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginHorizontal:5,
    margin: 10
    // overflow: 'hidden'
  },
  textContainer: {
    position: 'absolute',
    left: 0,
    bottom:5,
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: 1, height: 1}, 
    textShadowRadius: 2
  },
  score: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
});
