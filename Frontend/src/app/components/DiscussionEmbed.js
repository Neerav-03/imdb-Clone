import { DiscussionEmbed } from 'disqus-react';

<DiscussionEmbed
    shortname='imdbclone'
    config={
        {
            url: this.props.article.url,
            identifier: this.props.article.id,
            title: this.props.article.title,
            language: 'ENG' //e.g. for Traditional Chinese (Taiwan)
        }
    }
/>