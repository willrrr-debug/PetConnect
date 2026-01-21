import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/posts';
import { useApp } from '../context/AppContext';

const ForumScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isMockMode } = useApp();
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('全部');

  const fetchPosts = React.useCallback(async (cat: string) => {
    setLoading(true);
    const { data, error } = await postService.getPosts(cat);
    if (!error && data) {
      // 将数据库字段映射为组件需要的格式
      const mappedPosts = data.map(p => ({
        id: p.id,
        authorId: p.user_id,
        author: {
          id: p.profiles?.id,
          name: p.profiles?.name || '未知用户',
          avatar: p.profiles?.avatar_url || 'https://via.placeholder.com/40',
          verified: p.profiles?.verified || false
        },
        title: p.title,
        content: p.content,
        images: p.image_url ? [p.image_url] : (p.images || []),
        location: {
          city: p.location?.split(',')[0] || '',
          district: p.location?.split(',')[1]?.trim() || ''
        },
        urgency: p.is_emergency ? 'urgent' : 'normal',
        createdAt: new Date(p.created_at).toLocaleDateString(),
        likes: 0,
        shares: 0
      }));
      setPosts(mappedPosts);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (!isMockMode) {
      fetchPosts(activeCategory);
    } else {
      // Mock 模式逻辑
      import('../data/posts').then(({ mockPosts }) => {
        setPosts(mockPosts);
        setLoading(false);
      });
    }
  }, [isMockMode, activeCategory, fetchPosts]);

  const handleContact = (e: React.MouseEvent, authorId: string) => {
    e.stopPropagation();
    navigate(`/chat/${authorId}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen relative overflow-x-hidden text-[#181411] dark:text-[#f5f2f0] pb-24 font-display">
      <header className="sticky top-0 z-30 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between transition-colors duration-300">
        <h1 className="text-xl font-bold tracking-tight text-[#181411] dark:text-white">领养求助论坛</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
          <div
            onClick={() => navigate('/profile')}
            className="h-9 w-9 rounded-full bg-cover bg-center border border-gray-200 dark:border-gray-700 cursor-pointer"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5vLJ1OukI1OOSo8_LttlcZX5TjojtbZORPDBx6pG4xwoDQd3RbyxS972wzKw8epwV5tpPst1PmTkAwpSkx_C3FhzDMYecJ67W_MCs9krFjOkrfJHvfsh0OqmyhY-_gMB2F0Z73z2uihz0dJhwXYDJcHdxqxdYR-S2vuvtAGVBpK3GJlgXM90WI3G-Gc1lugWPwh8IRYrW1lVyoIkffQFUICC-gw_Jj9BfUpurP9aSKNmKmtYoCazxup-k2kgrzSyIeG4mV6Dnbf0')" }}
          >
          </div>
        </div>
      </header>

      <main className="flex flex-col w-full max-w-md mx-auto">
        <div className="px-4 py-3 bg-background-light dark:bg-background-dark">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#8a7260] dark:text-[#a08d80]">search</span>
            </div>
            <input className="block w-full pl-10 pr-3 py-3 border-none rounded-xl leading-5 bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-[#8a7260] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white dark:focus:bg-surface-dark shadow-sm sm:text-sm transition-all" placeholder="搜索关键词... (品种, 地点)" type="text" />
          </div>
        </div>

        {/* 分类栏 */}
        <div className="px-4 pb-2 flex gap-3 overflow-x-auto no-scrollbar snap-x">
          {['全部', '猫', '狗', '紧急', '附近'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-start shrink-0 flex items-center justify-center gap-1.5 h-9 px-4 rounded-full shadow-sm transition-transform active:scale-95 ${activeCategory === cat ? 'bg-[#181411] dark:bg-white text-white dark:text-[#181411] shadow-md' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-[#181411] dark:text-gray-200'}`}
            >
              <span className="text-sm font-medium">{cat}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 p-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <span className="material-symbols-outlined text-4xl mb-2">article</span>
              <p>暂无帖子</p>
            </div>
          ) : posts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer"
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url('${post.author.avatar}')` }}></div>
                  <div>
                    <p className="text-sm font-bold text-[#181411] dark:text-white leading-tight">
                      {post.author.name}
                      {post.author.verified && <span className="material-symbols-outlined text-primary text-[14px] align-middle ml-0.5" title="Verified">verified</span>}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.createdAt}</p>
                  </div>
                </div>
                <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>

              {post.images && post.images.length > 0 && (
                <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  {post.urgency === 'urgent' && (
                    <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 z-10">
                      <span className="material-symbols-outlined text-[14px]">warning</span> 紧急
                    </div>
                  )}
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${post.images[0]}')` }}></div>
                </div>
              )}

              <div className="px-4 py-3">
                <h3 className="text-lg font-bold text-[#181411] dark:text-white leading-tight mb-2">{post.title}</h3>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-3">
                  <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                  <span className="text-sm">{post.location.city}, {post.location.district}</span>
                </div>
                <p className="text-[#4a403a] dark:text-[#d1c6be] text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleContact(e, post.authorId)}
                    className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-[0_4px_10px_rgba(244,123,37,0.3)]"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    联系方式
                  </button>
                  <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </article>
          ))}

          <div className="h-8 flex items-center justify-center text-gray-400 text-sm">
            没有更多内容了
          </div>
        </div>
      </main>

      <button
        onClick={() => navigate('/create-post')}
        className="fixed bottom-24 right-5 z-40 h-14 bg-[#181411] dark:bg-primary text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center pr-6 pl-4 gap-2 transition-transform hover:scale-105 active:scale-95 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <span className="material-symbols-outlined text-[20px]">add</span>
        </div>
        <span className="font-bold tracking-wide">发帖求助</span>
      </button>
    </div>
  );
};

export default ForumScreen;