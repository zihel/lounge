<span role="button" class="user {{colorClass from}}" data-name="{{from}}">{{mode}}{{from}}</span>
{{#if hostmask}}
	<i class="hostmask">({{hostmask}})</i>
{{/if}}
has left the channel
{{#if text}}
	<i class="part-reason">({{{parse text}}})</i>
{{/if}}
