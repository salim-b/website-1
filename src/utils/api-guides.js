const VERCEL_URL =
  process.env.VERCEL_ENV === 'preview'
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : process.env.NEXT_PUBLIC_DEFAULT_SITE_URL;

const fs = require('fs');

const { glob } = require('glob');
const matter = require('gray-matter');

const GUIDES_DIR_PATH = 'content/guides';

const getPostSlugs = async (pathname) => {
  const files = await glob.sync(`${pathname}/**/*.md`, {
    ignore: [
      '**/RELEASE_NOTES_TEMPLATE.md',
      '**/README.md',
      '**/unused/**',
      '**/shared-content/**',
      '**/GUIDE_TEMPLATE.md',
    ],
  });
  return files.map((file) => file.replace(pathname, '').replace('.md', ''));
};

const getAuthor = (id) => {
  try {
    const authors = fs.readFileSync(`${GUIDES_DIR_PATH}/authors/data.json`, 'utf8');
    const authorsData = JSON.parse(authors);
    const authorData = authorsData[id];
    const authorPhoto = `${VERCEL_URL}/images/authors/${id}.jpg`;
    const author = {
      ...authorData,
      photo: authorPhoto,
    };

    if (author) {
      return author;
    }

    throw new Error(`Author with ID '${id}' not found.`);
  } catch (e) {
    return null;
  }
};

const getPostBySlug = (slug, pathname) => {
  try {
    const source = fs.readFileSync(`${pathname}/${slug}.md`);
    const { data, content } = matter(source);
    const authorID = data.author;
    const author = getAuthor(authorID);

    return { data, content, author };
  } catch (e) {
    return null;
  }
};

const getAllPosts = async () => {
  const slugs = await getPostSlugs(GUIDES_DIR_PATH);
  return slugs
    .map((slug) => {
      if (!getPostBySlug(slug, GUIDES_DIR_PATH)) return;
      const data = getPostBySlug(slug, GUIDES_DIR_PATH);

      const slugWithoutFirstSlash = slug.slice(1);
      const {
        data: { title, subtitle, createdAt, updatedOn, isDraft, redirectFrom },
        content,
        author,
      } = data;
      return {
        slug: slugWithoutFirstSlash,
        title,
        subtitle,
        author,
        createdAt,
        updatedOn,
        isDraft,
        content,
        redirectFrom,
      };
    })
    .filter((item) => process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' || !item.isDraft);
};

const getNavigationLinks = (slug, posts) => {
  const currentItemIndex = posts.findIndex((item) => item.slug === slug);
  const previousItem = posts[currentItemIndex - 1];
  const nextItem = posts[currentItemIndex + 1];

  return {
    previousLink: { title: previousItem?.title, slug: previousItem?.slug },
    nextLink: { title: nextItem?.title, slug: nextItem?.slug },
  };
};

module.exports = {
  getPostSlugs,
  getPostBySlug,
  getNavigationLinks,
  getAllPosts,
  GUIDES_DIR_PATH,
};
