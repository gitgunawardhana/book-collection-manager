import { Router } from 'express';
import { addBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/bookController';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get('/:id', authenticate, getBook);
router.get('/', authenticate, getBooks);
router.post('/', authenticate, addBook);
router.put('/:id', authenticate, updateBook);
router.delete('/:id', authenticate, deleteBook);

export default router;
