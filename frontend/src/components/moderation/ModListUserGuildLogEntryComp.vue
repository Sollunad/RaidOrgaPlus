<template>
    <div>
        {{formattedEntry}}
    </div>
</template>

<script>
    export default {
        name: "ModListUserGuildLogEntryComp",
        props: ['entry'],
        computed: {
            formattedEntry: function() {
                return `${this.formattedDate}: ${this.formattedType}${this.formattedBy}${this.formattedRankChange}`;
            },
            formattedDate: function() {
                const date = new Date(this.entry.time);
                const dateOptions = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
                return date.toLocaleDateString('de-DE', dateOptions);
            },
            formattedType: function() {
                switch (this.entry.type) {
                    case 'joined': return 'Gilde beigetreten';
                    case 'invited': return 'Eingeladen';
                    case 'kick': return 'Aus Gilde gekickt';
                    case 'rank_change': return 'Rang geändert';
                    default: return '';
                }
            },
            formattedBy: function() {
                switch (this.entry.type) {
                    case 'invited': return ` von ${this.entry.invited_by}`;
                    case 'kick': return ` von ${this.entry.kicked_by}`;
                    case 'rank_change': return ` von ${this.entry.changed_by}`;
                    default: return '';
                }
            },
            formattedRankChange: function() {
                if (this.entry.type === 'rank_change') {
                    return `: ${this.entry.old_rank} => ${this.entry.new_rank}`;
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>

</style>