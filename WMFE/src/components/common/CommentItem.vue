<template>  
    <li class="comment-item">
        <span class="user-img">
            <img src="https://pic.maizuo.com/usr/movie/539c2a6964b1078c954a828afdb0841a.jpg?x-oss-process=image/resize,m_fixed,h_0,w_300" alt="">
        </span>
        <div class="comment-area">
            <div class="comment-block-head">
                <span class="user-name">王*******聪</span>
                <span class="comment-time">2018-11-11</span>
            </div>
            <div class="comment-context">
                <p>IG牛逼</p>
            </div>
            <div class="reply"><i class="triangle"></i>商家回复：<span>亲爱的顾客，感谢您选择品尝本店的美食，谢谢您认可我们的口味和服务，我们会继续努力，为您提供更好的服务。祝您生活愉快！</span></div>
            <img class="comment-img" src="//fuss10.elemecdn.com/8/3a/c4d6b3406ba922febdf027e3e8fbcjpeg.jpeg?imageMogr/format/webp/thumbnail/300x/" alt="">
        </div>
    </li>
</template>

<script>
    export default{
    
}
</script>

<style lang="scss">
    .comment-item{
        padding: .4rem 0 .32rem 0;
        display: flex;
        width:100%;
        border-bottom: 1px solid #ccc;
        .user-img{
            width:.8rem;
            height:.8rem;
            img{
                border-radius: 50%;
                width:.8rem;
                height:.8rem;
            }
        }
        .comment-area{
            padding: 0 0 0 .2rem;
            
            width: 8.293333rem;
            
            .comment-block-head{
                display:flex;
                justify-content: space-between;
                .user-name{
                    font-size: .346667rem;
                }
                .comment-time{
                    font-size: .293333rem;
                    color: #999;
                }
            }
            .comment-context{
                width: 100%;
                text-align: left;
                font-size: .373333rem;
                color: #333;
                margin-top: .4rem;

            }
            .reply{
                .triangle {
                    width: 0;
                    height: 0;
                    border: .266667rem solid #F3F3F3;
                    position: absolute;
                    top: -0.533333rem;
                    left: .466667rem;
                    border-top-color: transparent;
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
                position: relative;
                margin: .333333rem 0;
                width: 100%;
                padding: .266667rem;
                margin-top: .333333rem;
                text-align: left;
                background-color: #f3f3f3;
                border-radius: .2rem;
            }
            .comment-img{
                float: left;
                width: 4rem;
                height: 4rem;
            }
        }
    }
</style>

