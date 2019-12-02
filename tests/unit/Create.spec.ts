import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Create from '@/views/Create.vue';

const localVue = createLocalVue();
Vue.use(Vuetify);
Vue.use(VueRouter);

const wrapper = shallowMount(Create, { stubs: ['PictureInput'] });
// console.log(wrapper.html());
describe('Create', () => {
  test('Sanity', () => {
    expect(true).toBe(true);
  });

  test('Visible', () => {
    expect(wrapper.isVisible()).toBe(true);
  });
});
