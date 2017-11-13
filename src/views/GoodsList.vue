<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="Goods">Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a @click="sortGoods" href="javascript:void(0)" class="price">
                        Price
                        <svg class="icon icon-arrow-short" :class="{'sort-up': !sortFlag }">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterShop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <a href="javascript:void(0)" :class="{'cur': priceChecked=='all'}" @click="setPriceFilter('all')">All</a>
                            </dd>
                            <dd v-for="(price,index) in priceFilter" :key="index">
                                <a href="javascript:void(0)" :class="{'cur': priceChecked==index}" @click="setPriceFilter(index)">
                                    {{price.startPrice}} - {{price.endPrice}}
                                </a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item,index) in goodsList" :key="index">
                                    <div class="pic">
                                        <a href="javascript:;">
                                            <img v-lazy="'/static/'+item.productImage" alt="">
                                        </a>
                                    </div>
                                    <div class="main">
                                        <div class="name" v-html="item.productName"></div>
                                        <div class="price" v-html="item.salePrice"></div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                                <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <modal v-bind:mdShow=" mdShowCart || mdShow " v-on:close="closeModal">
            <p slot="message">
                <svg class="icon icon-status-ok" :class="{'sort-up': !sortFlag }" v-if="mdShowCart">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span v-if="mdShowCart">加入购物车成功!</span>
                <span v-if="mdShow">请先登录!</span>
            </p>
            <div slot="btnGroup">
                <a href="javascript:void(0)" class="btn btn--m" @click=" mdShowCart = false " v-if="mdShowCart">继续购物</a>
                <router-link class="btn btn--m" href="javascript:void(0)" to="/cart" v-if="mdShowCart">查看购物车</router-link>
                <a href="javascript:void(0)" class="btn btn--m" @click=" mdShow = false " v-if="mdShow">关 闭</a>
            </div>
        </modal>
        <nav-footer></nav-footer>
    </div>
</template>
<style>
    .load-more{
        height: 100px;
        line-height: 100px;
        text-align: center
    }
    .icon-arrow-short{
        transition: all .3s ease-out;
    }
    .sort-up{
        transform: rotate(180deg);
        transition: all .3s ease-out;
    }
    .btn:hover{
        background-color: #ffe5e6;
        transition: all .3s ease-out
    }
</style>

<script>
    import './../assets/css/base.css'
    import './../assets/css/login.css'
    import './../assets/css/product.css'
    import NavHeader from './../components/NavHeader'
    import NavBread from '@/components/NavBread'
    import NavFooter from '@/components/NavFooter'
    import Modal from '@/components/Modal'
    import axios from 'axios'
    export default {
        data() {
            return {
                goodsList: [],
                priceChecked: 'all',
                sortFlag: true,
                page: 1,
                pageSize: 8,
                busy: true,
                loading: false,
                mdShow: false,
                priceLevel: 'all',
                filterBy: false,
                overLayFlag: false ,
                mdShowCart: false,
                priceFilter:[
                    {
                        startPrice: '0.00',
                        endPrice: '100.00'
                    },
                    {
                        startPrice: '100.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '5000.00'
                    }
                ]
            }
        },
        mounted(){
            this.getGoodsList();
        },
        components: {
            NavHeader,
            NavBread,
            NavFooter,
            Modal
        },
        methods:{
            showFilterShop(){
                this.filterBy = true;
                this.overLayFlag = true;
            },
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            },
            getGoodsList(flag){
                let param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag ? 1 : -1,
                    priceLevel: this.priceLevel
                };
                this.loading = true;
                axios.get('/goods/list',{
                    params: param
                }).then((response)=>{
                    let res = response.data;
                    this.loading = false;
                    if(res.status == '0'){
                        if(flag){
                            this.goodsList = this.goodsList.concat(res.result.list);
                            if(res.result.count==0){
                                this.busy = true;
                            }else{
                                this.busy = false;
                            }
                        }else{
                            this.goodsList = res.result.list;
                            this.busy = false;
                        }
                    }else{
                        goodsList = [];
                    }
                })
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            setPriceFilter(index){
                this.priceChecked = index;
                this.closePop();
                this.priceLevel = index;
                this.page = 1;
                this.getGoodsList();
            },
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                    this.page ++
                    this.getGoodsList(true);
                }, 500);
            },
            addCart(productId){
                axios.post('/goods/addCart',{
                    productId: productId
                }).then((response)=>{
                    let res = response.data;
                    if(res.status == 0){
                        this.mdShowCart = true;
                    }else{
                        this.mdShow = true;
                    }
                })
            },
            closeModal(){
                this.mdShow = false;
            }
        }
    }
</script>
