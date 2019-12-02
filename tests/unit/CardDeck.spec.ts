import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CardDeck from '@/components/CardDeck.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const sortby = 'new';
const order = 'descending';

const wrapper = shallowMount(CardDeck, {
  propsData: {
    sortby,
    order,
  },
});
// console.log(wrapper.html());
describe('CardDeck', () => {
  test('Sanity', () => {
    expect(true).toBe(true);
  });

  test('Visible', () => {
    expect(wrapper.isVisible()).toBe(true);
  });

  test('Sort by', () => {
    expect(wrapper.vm.$data.sortby).toBe(sortby);
  });

  test('Order', () => {
    expect(wrapper.vm.$data.order).toBe(order);
  });
});
