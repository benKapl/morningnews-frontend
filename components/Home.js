import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value)

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch(`${backendUrl}/articles`)
      .then(response => response.json())
      .then(data => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  const visibleArticles = articlesData.filter(data => {
    const isArticleHidden = hiddenArticles.some(article => article.title == data.title) // check that article si not included in hiddenArticles
    if (!isArticleHidden) {
      return data
    }
  })

  const articles = visibleArticles.map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
    // const isHidden = hiddenArticles.some(hiddenArticle => hiddenArticle === data.title);
    return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  });

  let topArticles;
  if (bookmarks.some(bookmark => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
