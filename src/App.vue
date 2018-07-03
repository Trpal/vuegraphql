<template>
	<div id="app">
		<h3>example 1</h3>
		<div>
			Data: {{ example1 }}
		</div>
		<button @click="getLanguage">Get Language</button>
    <h3>Example 2</h3>
    <div>
      Data:
      <div v-for="champion in champions">
        {{ champion }}
      </div>
      <button @click="getChampions">Get Champions</button>
    </div>
    <h3>Example 3</h3>
    Name: <input v-model="name">
    <div>
      Data:
      {{ champion }}
    </div>
    <button @click="getChampionByName">Get champion</button>
    <h3>Example 4</h3>
    name: <input type="text" v-model="name">
    attack: <input type="text" v-model.number="attack">
    <div>
      Data:
      {{ updatedChampion }}
    </div>
    <button @click="updateAttackDamage">Update champion</button>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'app',
		data () {
			return {
        example1: '',
        champions: [],
        champion: {},
        name: '',
        updatedChampion: {},
        attack: 5.5
			}
		},
		methods: {
			async getLanguage() {
				try {
					const res = await axios.post(
						'http://localhost:4000/graphql', {
						query: `{ language }`
          });
					this.example1 = res.data.data.language
				} catch (e) {
					console.log('err', e);
				}
      },

      async getChampions () {
        const res = await axios.post(
          'http://localhost:4000/graphql', {
          query: `{
            getChampions {
              name
            }
          }`
        });
        this.champions = res.data.data;
      },

      async getChampionByName () {
        const res = await axios.post('http://localhost:4000/graphql', {
          query: `
            query getChampionByName($championName: String!) {
              getChampionByName(name: $championName) {
                name attackDamage
              }
            }`,
            variables: {
              championName: this.name
            }
        });
        this.champion = res.data.data.getChampionByName
      },

      async updateAttackDamage () {
        const res = await axios.post('http://localhost:4000/graphql', {
          query: `
            mutation UpdateAttackDamage(
              $championName: String!, $attackDamage: Float) {
                updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
                  name
                  attackDamage
                }
              }`,
              variables: {
                championName: this.name,
                attackDamage: this.attack
              }
        });
        console.log(res.data);
        this.updatedChampion = res.data.data.updateAttackDamage
      }
		}
	}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
