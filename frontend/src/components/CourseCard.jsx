import { motion } from "framer-motion";

const CourseCard = ({ course, onEnroll, onBuy, enrolled }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -6 }}
    className="glass rounded-xl p-5 shadow-glow"
  >
    <h3 className="mb-2 text-lg font-semibold">{course.title}</h3>
    <p className="mb-3 line-clamp-3 text-sm text-slate-300">{course.description}</p>
    <div className="mb-4 text-sm text-slate-400">
      Price: {course.price > 0 ? `$${course.price}` : "Free"}
    </div>
    <div className="flex gap-2">
      {enrolled ? (
        <a
          href={course.videoUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded bg-emerald-600 px-3 py-2 text-sm"
        >
          Watch Video
        </a>
      ) : course.price > 0 ? (
        <button onClick={() => onBuy(course._id)} className="rounded bg-indigo-600 px-3 py-2 text-sm">
          Buy Course
        </button>
      ) : (
        <button onClick={() => onEnroll(course._id)} className="rounded bg-indigo-600 px-3 py-2 text-sm">
          Enroll Now
        </button>
      )}
    </div>
  </motion.article>
);

export default CourseCard;
