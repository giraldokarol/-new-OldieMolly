<script  setup lang="ts">
import { Product } from '../models/Product';
//Components
import Favorite from '../components/Favorite.vue';

const props = withDefaults(
    defineProps<{
        product?: Product
    }>(),
    {
        product: () => ({
            prodName: 'Product Name',
            price: 0,
            quantity: 0,
            type: 'Second Hand',
            description: 'Short description of ht product un max 70 characters',
            image: "",
            image2: "",
            image3: "",
            idUser: 0,
            idCategory: 0
        })
    }
);
</script>

<template>
    <article class="om_card">
        <div class="om_card_image" aria-label="Product's photo" :class="{'om_image': !!props.product.image?.trim()}">
            <img v-if="props.product.image !== ''" :src="props.product.image" :alt="props.product.prodName">
            <span v-else="props.product.image == ''" aria-hidden="true" class="om_icon_all"></span>
            <Favorite></Favorite>
        </div>
        <div class="om_card_header">
            <h2 class="om_card_title">
                <a href="#">{{ props.product.prodName }}</a>
            </h2>
            <p class="om_card_subtitle">
                {{ props.product.description }}
            </p>
        </div>
        <div class="om_card_body">
            <div class="om_card_price">
                <p>{{ props.product.price }} €</p>
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
.om_card{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #FFF;

    &_image {
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        background: $om_black_color5;
        @include rem(border-radius, 8);
        @include rem(min-width, 407);
        @include rem(height, 233);
        
        &.om_image {
            background: #FFF;
        }

        img {
            width: auto;
        }

        .om_favorite_btn {
            position: absolute;
            @include rem(top, 20);
            @include rem(right, 20);
        }

        span[class*="om_icon"]{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            @include svgSize(72);
            @include svgColor($om_black_color2);
        }
    }

    &_header, &_body {
        @include rem(margin-top, 12);
    }

    &_title {
        @include rem(margin, 0 0 8 0);
        @include rem(font-size, 16);
        a {
            text-decoration: none;
        }
    }

    &_subtitle {
        color: $om_black_color1;
    }

    &_price{
        font-weight: 700;
        @include rem(font-size, 18);
        p {margin: 0;}
    }

}
</style>