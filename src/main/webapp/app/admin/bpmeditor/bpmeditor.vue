<template>
    <div>
        <h2>
            <span id="bpm-management-page-heading" v-text="$t('bpmeditor.home.title')">工作流</span>
            <router-link tag="button" class="btn btn-primary float-right jh-create-entity" :to="{name: 'JhiBpmComponent'}">
                <font-awesome-icon icon="plus"></font-awesome-icon> <span v-text="$t('bpmeditor.home.createLabel')">Create a new bpm</span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
                 dismissible
                 :variant="alertType"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <div class="table-responsive" v-if="bpms">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('version')"><span v-text="$t('bpmeditor.version')">Version</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('bpmeditor.name')">Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('key')"> <span v-text="$t('bpmeditor.key')">Key</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody v-if ="bpms">
                <tr v-for="bpm of orderBy(bpms, propOrder, reverse === true ? 1 : -1)" :key="bpm.id" :id="bpm.id">
                    <td>{{bpm.id}}</td>
                    <td>{{bpm.version}}</td>
                    <td>{{bpm.name}}</td>
                    <td>{{bpm.key}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'JhibpmView', params: {bpmId: bpm.login}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'JhibpmEdit', params: {bpmId: bpm.login}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(bpm)"
                                      variant="danger"
                                      class="btn btn-sm delete"
                                      :disabled="bpmname === bpm.name"
                                      v-b-modal.removebpm>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <b-modal ref="removebpm" id="removebpm" title="Confirm delete operation" v-bind:title="$t('entity.delete.title')" @ok="deletebpm()">
                <div class="modal-body">
                    <p id="jhi-delete-bpm-heading" v-text="$t('bpmeditor.delete.question', { 'login': removeId})">Are you sure you want to delete this bpm?</p>
                </div>
            </b-modal>
        </div>
        <div v-if="bpms">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./bpmeditor.component.ts">
</script>
