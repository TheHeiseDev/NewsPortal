import styles from "./Comments.module.scss"
import  {memo} from 'react'
import { FormAddComment } from '../../../../components/FormAddComment/FormAddComment'
import { Comment } from '../../../../components/Comment/Comment'
import { PostType } from '../../../../store/slice/posts/postsTypes'


interface IComments {
    post: PostType
}

export const Comments = memo(({post} : IComments) => {
        return (
          <section className={styles.commentsContainer}>
          <h2>Добавить комментарий</h2>
          <FormAddComment post={post} />
      
          <h2>Комментарии: ({post.comments.length})</h2>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <span>Нет комментариев</span>
          )}
        </section>
        )
      }
)

