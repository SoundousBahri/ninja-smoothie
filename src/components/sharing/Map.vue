<template>
  <div class="map">

    <div id="map-container" @click="handleClick"></div>

  </div>
</template>

<script>
    import firebase from 'firebase'
    import db from '../../firebase/database'
    import mapboxgl from "../../mapAPI/mapboxgl";

    export default {
        name: 'Map',
        data() {
            return {
                lat: 36.7179681,
                lng: 5.983257699999999
            }
        },
        methods: {
            renderMap() {
                const map = new mapboxgl.Map({
                    container: 'map-container',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [this.lng, this.lat],
                    zoom: 4
                });


                new mapboxgl.Marker({color: '#CE0836'})
                    .setLngLat([this.lng, this.lat])
                    .addTo(map);


                db.collection('users').get().then(users => {
                    users.docs.forEach((doc) => {
                        let data = doc.data();
                        if (data.geolocation && data.user_id !== firebase.auth().currentUser.uid) {
                            db.collection('smoothies').where('user_id', '==', doc.id).get().then(s => {
                                new mapboxgl.Marker()
                                    .setLngLat([data.geolocation.lng, data.geolocation.lat])
                                    .setPopup(new mapboxgl.Popup().setHTML(`<div class="popup-profile"><div class="title">${data.username}</div><br/><div class="grey-text">${s.docs.length} smoothies</div><br/><button class="visit-profile btn waves-effect waves-light" data-id="${doc.id}">Visit Profile</button></div>`))
                                    .addTo(map);

                            });

                        }
                    });
                });

            },
            handleClick(e) {
                if (e.target.matches('.visit-profile, .visit-profile *')) {
                   this.$router.push({name: 'Profile', params: {user_id: e.target.dataset.id}})
                }
            }
        },
        mounted() {
            //get current user
            let user = firebase.auth().currentUser;

            //get user geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    this.lat = pos.coords.latitude;
                    this.lng = pos.coords.longitude;

                    db.collection('users').where('user_id', '==', user.uid).get()
                        .then((snapshot) => {
                            snapshot.forEach(doc => {
                                db.collection('users').doc(doc.id).update({
                                    geolocation: {
                                        lat: this.lat,
                                        lng: this.lng
                                    }
                                })
                            });


                        });

                    this.renderMap();
                }, (err) => {
                    console.log(err);
                    this.renderMap()
                }, {maximumAge: 60000, timeout: 3000})
            } else {
                this.renderMap()//we don't call this function once cause the other 2 places are asynchronous calls
            }
        }
    }
</script>
<style>

  #map-container {

    width      : 100%;
    height     : 100%;
    background : #FFFFFF;
    position   : absolute;
    top        : 0;
    left       : 0;
    z-index    : -1;
  }
</style>
