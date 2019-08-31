import axios, { AxiosPromise } from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';
import buildPaginationQueryOpts from '@/shared/sort/sorts';

@Component
export default class BpmeditorService extends Vue {
  public retrieve(req?: any): Promise<any> {
    return axios.get(`api/bpm/bpms?${buildPaginationQueryOpts(req)}`);
  }

  public remove(modelId: number): Promise<any> {
    return axios.delete(`api/bpm/bpms/${modelId}`);
  }
}
