<template>
    <div class="subheading">
        <span>{{formattedEntry}}</span>
        <v-avatar v-if="entry.stashIcon" tile :size="30" class="itemIcon">
            <img :src="entry.stashIcon">
        </v-avatar>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "ModListUserGuildLogEntryComp",
        props: ['entry'],
        computed: {
            formattedEntry: function(): string {
                return `${this.formattedDate}: ${this.formattedType}${this.formattedBy}${this.formattedRankChange}`;
            },
            formattedDate: function(): string {
                const date = new Date(this.entry.time);
                const dateOptions = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
                return date.toLocaleDateString('de-DE', dateOptions as any);
            },
            formattedType: function(): string {
                switch (this.entry.type) {
                    case 'joined': return 'Gilde beigetreten';
                    case 'invited': return 'Eingeladen';
                    case 'kick': return 'Aus Gilde gekickt';
                    case 'rank_change': return 'Rang geändert';
                    case 'item': return this.entry.stashText;
                    case 'coin': return this.entry.stashText;
                    default: return 'Unbekannter Eintrag';
                }
            },
            formattedBy: function(): string {
                switch (this.entry.type) {
                    case 'invited': return ` von ${this.entry.invited_by}`;
                    case 'kick': return ` von ${this.entry.kicked_by}`;
                    case 'rank_change': return ` von ${this.entry.changed_by}`;
                    default: return '';
                }
            },
            formattedRankChange: function(): string {
                if (this.entry.type === 'rank_change') {
                    return `: ${this.entry.old_rank} => ${this.entry.new_rank}`;
                } else {
                    return '';
                }
            }
        }
    })
</script>

<style scoped>
    .itemIcon {
        margin-left: 10px;
    }
</style>