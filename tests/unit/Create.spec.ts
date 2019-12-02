// component access
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Create from '@/views/Create.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);


const wrapper = shallowMount(Create, {
  localVue,
  stubs: ['PictureInput'],
});
// console.log(wrapper.html());
describe('Create', () => {
  test('Sanity', () => {
    expect(true).toBe(true);
  });

  test('Visible', () => {
    expect(wrapper.isVisible()).toBe(true);
  });
});
