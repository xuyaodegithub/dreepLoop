<template>
    <div class="freeimg">
        <v-header></v-header>
        <!--        <div :style="style">-->
        <!--            <div class="flex a-i headers">-->
        <!--                <div><a href="index.html"><img src="../../assets/logo.png" alt=""></a></div>-->
        <!--                <ul class="flex a-i">-->
        <!--                    <li class="flex a-i cu">-->
        <!--                        <el-dropdown trigger="click" placement="bottom" @command="command">-->
        <!--      <span class="el-dropdown-link">-->
        <!--        类别<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--      </span>-->
        <!--                            <el-dropdown-menu slot="dropdown">-->
        <!--                                <el-dropdown-item :command="1">黄金糕</el-dropdown-item>-->
        <!--                                <el-dropdown-item :command="2">狮子头</el-dropdown-item>-->
        <!--                                <el-dropdown-item :command="3">螺蛳粉</el-dropdown-item>-->
        <!--                            </el-dropdown-menu>-->
        <!--                        </el-dropdown>-->
        <!--                    </li>-->
        <!--                    <li><a href="#">版权</a></li>-->
        <!--                    <li><a href="#">人物抠图</a></li>-->
        <!--                    <li><a href="#">物体抠图</a></li>-->
        <!--                    <li><a href="">登录/注册</a></li>-->
        <!--                </ul>-->
        <!--            </div>-->
        <!--            <div class="seach">-->
        <!--                <h1>免费可商用PNG素材</h1>-->
        <!--                <div class="keyWords">-->
        <!--                    <el-input placeholder="搜索PNG素材" v-model="input3" class="input-with-select" @keyup.enter.native="seach">-->
        <!--                        <el-button slot="append" icon="el-icon-search" @click="seach">搜索</el-button>-->
        <!--                    </el-input>-->
        <!--                    <div class="flex a-i tags">-->
        <!--                        <label>热门标签:</label>-->
        <!--                        <span v-for="(item,idx) in tags" :key="idx">{{item}}</span>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <div class="classImg flex a-i">-->
        <!--                <div v-for="(item,idx) in 8" :key="idx"><img-->
        <!--                        src="https://cdn.pixabay.com/photo/2019/10/16/21/24/nature-4555486__340.jpg" alt=""></div>-->
        <!--            </div>-->
        <!--        <div class="classBtn">-->
        <!--            <span class="cu" v-for="(item,idx) in classBtn" :key="idx" :class="{active : classType===idx}"-->
        <!--                  @click="changeType(idx)">{{item}}</span>-->
        <!--        </div>-->
        <div class="mainContent flex f-w" id="main">
            <!--            <div class="iboot-item" v-for="(item,idx) in list" :key="idx">-->
            <!--                <a href="">-->
            <!--                    <img src="../../assets/image/initImg.jpg" alt="">-->
            <!--                </a>-->
            <!--            </div>-->
            <!--        <div v-for="(item,idx) in list" :key="idx" class="item">-->
            <!--          <a href="#"><img :src="item" alt=""></a>-->
            <!--        </div>-->
        </div>
        <div class="block">
            <el-pagination
                    @current-change="pageChange"
                    background
                    layout="prev, pager, next"
                    :total="list.length"
                    :page-size="rows"
                    :current-page="page">
            </el-pagination>
        </div>
        <!--        <footer>-->
        <!--            <div class="margin flex">-->
        <!--                <div class="F_l">-->
        <!--                    <img src="static/logos.png" alt="">-->
        <!--                    <p>皮卡智能PicUP.AI利用人工智能和计算机视觉的力量，提供各种各样的产品、素材和API,为不同领域 的客户提供服务，包括设计行业、国内电商、跨境-->
        <!--                        电商、照片处理APP、表情制作小程序开发等。</p>-->
        <!--                </div>-->
        <!--                <div>-->
        <!--                    <h5>智能抠图</h5>-->
        <!--                    <a href="people.html">人像抠图</a>-->
        <!--                    <a href="objects.html">物体抠图</a>-->
        <!--                    <a href="docsify/#/apidoc_api.md">API</a>-->
        <!--                    <a href="userVip.html">定价</a>-->
        <!--                </div>-->
        <!--                <div>-->
        <!--                    <h5>功能应用</h5>-->
        <!--                    <span class="guo ewn cu" onclick="showEwm(0)">国庆同框-->
        <!--                <img src="static/e1.png" alt="">-->
        <!--            </span>-->
        <!--                    <span class="lv ewn cu" onclick="showEwm(1)">一键旅拍-->
        <!--                <img src="static/e1.png" alt=""></span>-->
        <!--                    <a href="product.html">更多产品</a>-->
        <!--                </div>-->
        <!--                <div>-->
        <!--                    <h5>关于我们</h5>-->
        <!--                    <a href="aboutUs.html">联系我们</a>-->
        <!--                    <a href="docsify/#/registerdoc_terms.md">服务和隐私</a>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </footer>-->
        <!--        <div class="f_last">-->
        <!--            © 2018-2020皮卡智能PicUP.AI-->
        <!--        </div>-->
    </div>
</template>

<script>
    // @ is an alias to /src
    import '@/utils/iboot.js'
    import back from "@/assets/image/back.jpg"
    import vHeader from '@/components/header'

    export default {
        name: 'home',
        data() {
            return {
                style: {
                    backgroundImage: `url(${back})`,
                    backgroundRepeat: 'norepeat',
                    backgroundSize: 'cover'
                },
                tags: ['人物', '动物', '植物', '夜晚', '黄昏', '夕阳', '日落日出', '地球'],
                input3: '',
                classBtn: ['全部', '人物', '女装', '男装', '图标元素', '装饰图案', '促销标签', '节日元素', '艺术体', '其他'],
                classType: 0,
                list: [
                    {
                        "name": "Turtle, Food, Butterfly Garden, Armored",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/11/14/55/turtle-4542035_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Food, Fruit, Harvest",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/08/19/01/pumpkin-4461665_960_720.jpg"
                    }, {
                        "name": "Podgrzybki, Siamese, Heart, Love, Near",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/06/21/43/podgrzybki-4531234_960_720.jpg"
                    }, {
                        "name": "Sunflower, Beauty, Background, Petals",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/11/08/25/sunflower-4541360_960_720.jpg"
                    }, {
                        "name": "Glasses, Glass, Drying, Terrace",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/06/48/glasses-4547992_960_720.jpg"
                    }, {
                        "name": "Sierpeper, Sierpaprika, Capsicum, Plant",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/01/17/21/sierpeper-4518888_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Decoration, Orange",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/05/18/20/pumpkin-4454745_960_720.jpg"
                    }, {
                        "name": "Fat Balls, Bird Houses, Food, Bird",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/07/02/14/fat-balls-4531584_960_720.jpg"
                    }, {
                        "name": "Pumpkin Soup, Soup, Hokkaido Soup Ginger",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/27/09/59/pumpkin-soup-4508015_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Fruit, Autumn, Choose, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/02/15/36/pumpkin-4521240_960_720.jpg"
                    }, {
                        "name": "Citric, Fruit, Lemon, Citrus, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/11/14/03/citric-4541929_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Halloween, Decoration",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/17/06/46/pumpkin-4556140_960_720.jpg"
                    }, {
                        "name": "Squirrel, Food, Young Animal, Young",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/29/20/30/squirrel-4514290_960_720.jpg"
                    }, {
                        "name": "Fruit, Vitamins, Fresh, Healthy, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/02/17/24/fruit-4521489_960_720.jpg"
                    }, {
                        "name": "Tomatoes, Vegetables, Garden, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/15/53/tomatoes-4552185_960_720.jpg"
                    }, {
                        "name": "Gingerbread, Gingerbread Heart",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/22/15/gingerbread-4550109_960_720.jpg"
                    }, {
                        "name": "Pomegranate, Seduction, Sweet, Fruit",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/27/15/26/pomegranate-4508741_960_720.jpg"
                    }, {
                        "name": "Eat, Fruit, Food, Pear, Sweet, Juicy",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/08/12/07/eat-4534853_960_720.jpg"
                    }, {
                        "name": "Garlic, Ripe, Fresh, Food, Healthy, Bio",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/03/14/17/garlic-4523460_960_720.jpg"
                    }, {
                        "name": "Green, Meadow, Plants, Growth, Flowering",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/09/23/54/green-4538396_960_720.jpg"
                    }, {
                        "name": "Garlic, Fresh, Harvest, Food, Healthy",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/05/12/16/garlic-4527870_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Fruit, Autumn, Choose, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/07/15/23/pumpkin-4459053_960_720.jpg"
                    }, {
                        "name": "Ginger, Local Food, Market, Food, Spices",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/44/ginger-4546049_960_720.jpg"
                    }, {
                        "name": "At The End Of The Year, Magenta, Meadow",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/13/18/37/at-the-end-of-the-year-4474646_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Food, Fruit, Harvest",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/08/18/48/pumpkin-4461630_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Fruit, Autumn, Choose, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/01/09/41/pumpkin-4517738_960_720.jpg"
                    }, {
                        "name": "Roast Duck, Half Duck, Poultry, Meat",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/01/13/35/roast-duck-4518288_960_720.jpg"
                    }, {
                        "name": "Carrots, Vegetables, Red, Food, Fresh",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/19/54/carrots-4549884_960_720.jpg"
                    }, {
                        "name": "Apples, Apple, Harvest, Fruit, Vitamins",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/21/31/apples-4550058_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Fruits, Autumn, Choose, Harvest",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/09/12/32/pumpkin-4537296_960_720.jpg"
                    }, {
                        "name": "Flower, Bee, Nature, Beautiful, Stamens",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/08/11/10/flower-4534709_960_720.jpg"
                    }, {
                        "name": "Engine, Arable, Nature, Agriculture",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/15/16/engine-4549173_960_720.jpg"
                    }, {
                        "name": "Peas, Ripe, Fresh, Bio, Healthy, Harvest",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/03/14/08/peas-4523414_960_720.jpg"
                    }, {
                        "name": "Chestnuts, Edible, Fruit, Barbed, Eat",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/16/19/44/chestnuts-4555289_960_720.jpg"
                    }, {
                        "name": "Czubajka Kite, Sowa, Plaques, Mushroom",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/09/20/41/czubajka-kite-4538190_960_720.jpg"
                    }, {
                        "name": "Great Tit, Great Tits, The Birds, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/17/11/great-tit-4549439_960_720.jpg"
                    }, {
                        "name": "Blackbird, Berries, Autumn, Food, Beak",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/11/06/59/blackbird-4541225_960_720.jpg"
                    }, {
                        "name": "Chives, Onion, Green, Vegetables, Health",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/04/19/38/chives-4526403_960_720.jpg"
                    }, {
                        "name": "Thanksgiving, Food, Vegetables, Harvest",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/07/41/thanksgiving-4548089_960_720.jpg"
                    }, {
                        "name": "Vegetables, Peppers, Red, Kitchen, Food",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/08/59/vegetables-4543454_960_720.jpg"
                    }, {
                        "name": "Bread, Flour, Bakery, Pastries",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/08/09/41/bread-4534546_960_720.jpg"
                    }, {
                        "name": "Vinegar, Oil, Salt, Pepper, Cover",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/08/10/14/vinegar-4534608_960_720.jpg"
                    }, {
                        "name": "Pumpkin Soup, Soup, Hokkaido Soup Ginger",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/27/10/01/pumpkin-soup-4508021_960_720.jpg"
                    }, {
                        "name": "Cake, Chocolate Cake, Chocolate, Bake",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/09/24/21/49/cake-4502270_960_720.jpg"
                    }, {
                        "name": "Bouquet, Flower, Yellow",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/06/17/09/bouquet-4530761_960_720.jpg"
                    }, {
                        "name": "Forest Beetle, The Beetle, Antennae",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/16/59/forest-beetle-4549409_960_720.jpg"
                    }, {
                        "name": "Cafe, Architecture, Building, Greece",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg"
                    }, {
                        "name": "Coffee Beans, Coffee, Aroma, Roasted",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/13/coffee-beans-4545947_960_720.jpg"
                    }, {
                        "name": "Czubajka Kite, Sowa, Plaques, Mushroom",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/09/20/45/czubajka-kite-4538194_960_720.jpg"
                    }, {
                        "name": "Thanksgiving, Grapes, Vegetables, Fruit",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/07/41/thanksgiving-4548097_960_720.jpg"
                    }, {
                        "name": "Chili, Fruit, Plant, Red, Healthy, Hot",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/01/28/chili-4550335_960_720.jpg"
                    }, {
                        "name": "Meatballs, Hack Fishball, Meat",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/28/21/04/meatballs-4511773_960_720.jpg"
                    }, {
                        "name": "Pomegranate, Fruits, Vitamins, Harvest",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/15/10/pomegranate-4549146_960_720.jpg"
                    }, {
                        "name": "Beans, Harvest, Vegetables, Food",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/03/14/10/beans-4523422_960_720.jpg"
                    }, {
                        "name": "Bread, Herbs, Cheese, Herb Bread, Bake",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/07/15/40/bread-4532951_960_720.jpg"
                    }, {
                        "name": "Usa, Diner, Restaurant, Retro, Building",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/08/18/13/37/usa-4414166_960_720.jpg"
                    }, {
                        "name": "Pumpkins, Autumn, Decoration, Pumpkin",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/06/48/pumpkins-4547993_960_720.jpg"
                    }, {
                        "name": "Fruit, Grapes, Still Life, Nature",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/01/09/03/fruit-4517631_960_720.jpg"
                    }, {
                        "name": "Nuts, Italian, Food, Cover, Garden",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/19/33/nuts-4549827_960_720.jpg"
                    }, {
                        "name": "Podgrzybki, Siamese, Heart, Love, Near",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/21/29/podgrzybki-4544952_960_720.jpg"
                    }, {
                        "name": "The Inscriptions, The Inscription",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/51/the-inscriptions-4546077_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Decoration, Choose",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/21/15/32/pumpkin-4494154_960_720.jpg"
                    }, {
                        "name": "Puffball, Fungus, Log, White, Mushroom",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/04/47/puffball-4545383_960_720.jpg"
                    }, {
                        "name": "Physalis, Fruit, Berry, Orange, Food",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/04/18/04/physalis-4526212_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Field, Patch, Autumn, Halloween",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/10/18/56/pumpkin-4540291_960_720.jpg"
                    }, {
                        "name": "Coffee, Grinder, Vintage, Cup, Old",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/15/37/coffee-4549229_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Food, Fruit, Harvest",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/10/06/38/pumpkin-4465358_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Fruit, Autumn, Choose, Food",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/10/02/43/pumpkin-4465108_960_720.jpg"
                    }, {
                        "name": "Seafood, Fish, Food, Salmon, Fresh, Meal",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/08/10/seafood-4548147_960_720.jpg"
                    }, {
                        "name": "Sheet, Water, Drops, Rain, Dew, Nature",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/08/11/01/sheet-4534694_960_720.jpg"
                    }, {
                        "name": "Grapes, Ripe, Harvest, Fruit, Vitamins",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/03/14/13/grapes-4523451_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Food, Harvest, Autumn",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/21/34/pumpkin-4547288_960_720.jpg"
                    }, {
                        "name": "Halloween, October, Autumn, Creepy",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/08/15/42/halloween-4535278_960_720.jpg"
                    }, {
                        "name": "Fruit, Raspberries, Blueberries, Berries",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/24/13/46/fruit-4501340_960_720.jpg"
                    }, {
                        "name": "Chrysanthemum, Flower, Bloom, Petals",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/19/57/chrysanthemum-4544730_960_720.jpg"
                    }, {
                        "name": "Holiday Wine And Honey, Honey, Wine",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/10/23/13/holiday-wine-and-honey-4540715_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Decoration, Choose",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/21/15/39/pumpkin-4494186_960_720.jpg"
                    }, {
                        "name": "Physalis, Plant, Nachtschattengewächs",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/04/08/26/physalis-4451017_960_720.jpg"
                    }, {
                        "name": "Pepper, Red, Plate, Nutrition, Healthy",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/16/18/10/pepper-4555089_960_720.jpg"
                    }, {
                        "name": "Still Life, Pumpkins, Food, Autumn",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/14/25/still-life-4549008_960_720.jpg"
                    }, {
                        "name": "Squirrel, Food, Young Animal, Cute",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/29/18/25/squirrel-4514048_960_720.jpg"
                    }, {
                        "name": "Food, Meal, Lunch, Dinner, Soup, Noodle",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/12/46/food-4548801_960_720.jpg"
                    }, {
                        "name": "Lime, Fruit, Citrus, Healthy, Sour",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/08/21/lime-4551036_960_720.jpg"
                    }, {
                        "name": "Jam, Apple Jam, Apple, Windfall",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/02/14/07/jam-4521020_960_720.jpg"
                    }, {
                        "name": "Mushrooms, Fungi, Autumn, Forest, Nature",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/15/59/mushrooms-4546462_960_720.jpg"
                    }, {
                        "name": "Apple, Fruit, Garden, Healthy, Fresh",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/26/03/43/apple-4504984_960_720.jpg"
                    }, {
                        "name": "Podgrzybki, Siamese, Heart, Love, Near",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/21/23/podgrzybki-4544939_960_720.jpg"
                    }, {
                        "name": "The Inscriptions, The Inscription",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/56/the-inscriptions-4546088_960_720.jpg"
                    }, {
                        "name": "Sea Bridge, Sellin, Baltic Sea, Rügen",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/12/15/21/sea-bridge-4471852_960_720.jpg"
                    }, {
                        "name": "Squirrel, Nuts, Tree, Eat, Autumn",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/17/57/squirrel-4549578_960_720.jpg"
                    }, {
                        "name": "Falafel, Tahini, Appetizer, Food",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/15/39/falafel-4544137_960_720.jpg"
                    }, {
                        "name": "Cucumbers, Kiszenie, Małosolne, Kitchen",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/07/15/cucumbers-4548037_960_720.jpg"
                    }, {
                        "name": "Herring, Court, Menu, Delicious, Eat",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/26/21/06/herring-4507066_960_720.jpg"
                    }, {
                        "name": "Deer Apples, Fruit, Nature, Tree, Branch",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/05/04/05/deer-apples-4526967_960_720.jpg"
                    }, {
                        "name": "Architecture, Cafe, Building, Restaurant",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/17/17/architecture-4546618_960_720.jpg"
                    }, {
                        "name": "Artichoke, Artichoke Flower, Purple",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/16/11/16/artichoke-4480703_960_720.jpg"
                    }, {
                        "name": "Radish, Red, Farmers Market, Vegetables",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/45/radish-4546056_960_720.jpg"
                    }, {
                        "name": "Tomato, Cherry Tomato, Pints, Vegetables",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/45/tomato-4546053_960_720.jpg"
                    }, {
                        "name": "The Inscriptions, The Inscription",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/52/the-inscriptions-4546080_960_720.jpg"
                    }, {
                        "name": "Roses, Garden, Flowers, Bloom, Flower",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/07/11/02/roses-4532369_960_720.jpg"
                    }, {
                        "name": "Pears, Garden, Vegetable Garden, Ukraine",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/18/23/pears-4546831_960_720.jpg"
                    }, {
                        "name": "Zwetschgendatschi, Plum Cake, Plums",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/17/14/zwetschgendatschi-4544327_960_720.jpg"
                    }, {
                        "name": "Podgrzybki, Siamese, Heart, Love, Near",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/22/04/podgrzybki-4545001_960_720.jpg"
                    }, {
                        "name": "Radish, A Vegetable, Food, Fresh",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/07/15/radish-4548034_960_720.jpg"
                    }, {
                        "name": "Pizza, Different, Friends, Roundelay",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/05/37/pizza-4547868_960_720.png"
                    }, {
                        "name": "Radish, A Vegetable, Food, Fresh",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/07/15/radish-4548033_960_720.jpg"
                    }, {
                        "name": "Pear, Fruit, Food, Vitamins, Healthy",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/17/59/pear-4546746_960_720.jpg"
                    }, {
                        "name": "Beverage, Blog, Blogger, Break, Business",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2018/02/16/10/52/beverage-3157395_960_720.jpg"
                    }, {
                        "name": "Leaves, Plant, Green, Nature, Natural",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/09/48/leaves-4551194_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Autumn, Food, Fruit, Harvest",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/10/06/51/pumpkin-4465375_960_720.jpg"
                    }, {
                        "name": "Price, Pumpkin, Drink, Autumn, Beverages",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/10/40/price-4545806_960_720.jpg"
                    }, {
                        "name": "Parsley, Root, Food, Healthy, Perlin",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/18/05/parsley-4546755_960_720.jpg"
                    }, {
                        "name": "Parsley, Root, Food, Healthy, Perlin",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/18/05/parsley-4546757_960_720.jpg"
                    }, {
                        "name": "Radish, A Vegetable, Spring, Food",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/07/15/radish-4548031_960_720.jpg"
                    }, {
                        "name": "Peppermint, Glass, A, Mint, Beverage",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/11/45/peppermint-4548670_960_720.jpg"
                    }, {
                        "name": "Flower Basket, Sunflower, Bumblebees",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/14/10/00/flower-basket-4548443_960_720.jpg"
                    }, {
                        "name": "Gyros, Doner, Hummus, Kebab, Delicious",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/15/12/gyros-4544061_960_720.jpg"
                    }, {
                        "name": "Kitchen, Canteen, Tea, Tea Party, Cup",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/11/31/kitchen-4551417_960_720.jpg"
                    }, {
                        "name": "Palm, Tree, Fruit, Beautiful, Nature",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/05/04/06/palm-4526969_960_720.jpg"
                    }, {
                        "name": "Grapes, Fruit, Vine, Table Grapes, Food",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/02/20/51/grapes-4448081_960_720.jpg"
                    }, {
                        "name": "The Inscriptions, The Inscription",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/12/54/the-inscriptions-4546086_960_720.jpg"
                    }, {
                        "name": "Parsley, Root, Food, Healthy, Perlin",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/13/18/05/parsley-4546756_960_720.jpg"
                    }, {
                        "name": "Fruit, Raspberries, Blueberries, Berries",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/24/04/42/fruit-4500204_960_720.jpg"
                    }, {
                        "name": "Corn, Autumn, Corn On The Cob, Cornfield",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/08/17/04/corn-4535538_960_720.jpg"
                    }, {
                        "name": "Blue, Flower, Vegetable, Flora, Petals",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/10/04/13/46/blue-4525730_960_720.jpg"
                    }, {
                        "name": "Cep, Mushroom, Herrenpilz, Brown Cap",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/08/08/50/cep-4460441_960_720.jpg"
                    }, {
                        "name": "Pumpkin, Decorative Squashes, Fruit",
                        "page": "2",
                        "src": "https://cdn.pixabay.com/photo/2019/09/21/18/48/pumpkin-4494531_960_720.jpg"
                    }
                ],
                page: 1,
                rows: 10
            }
        },
        components: {
            vHeader
        },
        methods: {
            command(i) {
                console.log( i )
            },
            changeType(idx) {
                this.classType = idx;
            },
            pageChange(page) {
                console.log( page, this.page, this.list.length )
            },
            seach() {
                if (this.input3 === '') return;
                window.location.href = `http://localhost:8080/seach.html#/?keyword=${this.input3}`
            }
        },
        mounted() {
            const _self = this
            var iboot = new Iboot( '#main', {
                list: _self.list,
                baseHeight: 350,
            } )
            $( window ).resize( function () {
                iboot.resize()
            } )
        }
    }
</script>
<style scoped lang="scss">
    .freeimg {
        padding-top: 60px;
    }

    .headers {
        font-size: 14px;
        color: #fff;
        /*background: linear-gradient(to bottom, #341223, #3f1926);*/
        justify-content: space-between;
        padding: 0 55px;

        .el-dropdown-link {
            color: #fff;
        }

        li {
            line-height: 60px;
            padding: 0 35px;
        }

        li:first-child {
            line-height: 1;
        }

        li a {
            display: block;
            color: #fff;

        }

        li:last-child a {
            line-height: 28px;
            border: 1px solid $co;
            padding: 0 25px;
            border-radius: 4px;
            color: $co;
        }
    }

    .seach {
        text-align: center;
        padding: 138px 0 108px 0;
        /*background: linear-gradient(to bottom, #3f1926, #651810);*/
        color: #fff;

        button.el-button {
            background-color: $co;
            border-radius: 0;
            color: #fff;
            border: 1px solid $co;
        }

        h1 {
            font-size: 36px;
            margin-bottom: 48px;
        }

        .el-input {
            width: 40%;
        }

        .tags {
            width: 40%;
            margin: 18px auto 0;

            span {
                margin: 0 12px;
                cursor: pointer;
            }
        }
    }

    .classImg {
        padding: 33px 51px;

        img {
            display: block;
            width: 100%;
        }

        & > div {
            flex: 1;
            margin: 0 6px;
        }
    }

    .classBtn {
        font-size: 14px;
        color: #333;
        margin: 30px 0;
        line-height: 1;
        padding: 0 56px;

        span {
            margin-right: 22px;
        }

        .active {
            color: $co;
        }
    }

    .mainContent {
        padding: 0 50px;
        /*max-width: 1710px;*/
        margin: 0 auto;
        margin-bottom: 62px;
        /*justify-content: center;*/
        & > div {
            margin: 5px;
        }
    }

    .block {
        text-align: center;
    }

    footer {
        margin-top: 80px;
        background-color: #191919;
        color: rgb(152, 152, 152);
        font-size: 14px;
        line-height: 22px;
        padding: 40px 0 80px 0;
        border-bottom: 1px solid rgb(152, 152, 152);
    }

    footer h5 {
        line-height: 1;
        font-size: 20px;
        color: #fff;
    }

    footer .F_l {
        width: 325px;
        margin-right: 85px;
    }

    footer .F_l img, footer h5 {
        margin-bottom: 25px;
    }

    footer a, footer span {
        display: block;
        color: rgb(152, 152, 152);
        line-height: 30px;
    }

    footer .F_l ~ div {
        margin-right: 120px;
    }

    .f_last {
        font-size: 16px;
        color: rgb(152, 152, 152);
        text-align: center;
        line-height: 57px;
        background-color: #191919;
    }

    .guo, .lv {
        position: relative;
    }

    .guo:hover img, .lv:hover img {
        display: block;
    }

    .guo img, .lv img {
        position: absolute;
        right: -100%;
        bottom: 0;
        background-color: #fff;
        display: none;
    }
</style>
