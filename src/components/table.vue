<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">家計簿リスト</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="支払い者検索" v-model="search" @input="searchOnTable" class="find"/>
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="検索結果ぜろー"
        :md-description="`'${search}' っていう検索条件に当てはまるデータはないっすね`">
        <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="日付" md-sort-by="date">{{ item.date }}</md-table-cell>
        <md-table-cell md-label="種別" md-sort-by="type">{{ item.type }}</md-table-cell>
        <md-table-cell md-label="価格" md-sort-by="cost">{{ item.cost }}</md-table-cell>
        <md-table-cell md-label="支払い者" md-sort-by="payment">{{ item.payment }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }
  const searchByPayment = (items, term) => {
    if (term !== null) {
      return items.filter(item => toLower(item.payment).includes(toLower(term)))
    }
    return items
  }

  export default {
    name: 'TableSearch',
    data: () => ({
      search: null,
      searched: [],
      users: [
        {
          id: 1,
          date: 'Shawna Dubbin',
          cost: 'sdubbin0@geocities.com',
          payment: 'Male'
        },
        {
          id: 2,
          date: 'Odette Demageard',
          cost: 'odemageard1@spotify.com',
          payment: 'Female'
        },
        {
          id: 3,
          date: 'Vera Taleworth',
          cost: 'vtaleworth2@google.ca',
          payment: 'Male'
        },
        {
          id: 4,
          date: 'Lonnie Izkovitz',
          cost: 'lizkovitz3@youtu.be',
          payment: 'Female'
        },
        {
          id: 5,
          date: 'Thatcher Stave',
          cost: 'tstave4@reference.com',
          payment: 'Male'
        },
        {
          id: 6,
          date: 'Karim Chipping',
          cost: 'kchipping5@scribd.com',
          payment: 'Female'
        },
        {
          id: 7,
          date: 'Helge Holyard',
          cost: 'hholyard6@howstuffworks.com',
          payment: 'Female'
        },
        {
          id: 8,
          date: 'Rod Titterton',
          cost: 'rtitterton7@nydailynews.com',
          payment: 'Male'
        }
      ]
    }),
    props: [
      'items'
    ],
    methods: {
      newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByPayment(this.items, this.search)
      }
    },
    created () {
      this.searched = this.items
    },
    watch: {
      items: function () {
        this.searched = this.items
      }
    }
  }
</script>

<style scoped>
.md-field {
  max-width: 300px;
}
.find {
  color: #FFF;
  font-size: 1.5vw;
}
.find::placeholder {
  color: #FFF;
  font-size: 1.5vw;
}
</style>
