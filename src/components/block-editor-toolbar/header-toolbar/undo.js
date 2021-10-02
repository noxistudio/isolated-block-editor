/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { displayShortcut } from '@wordpress/keycodes';
import { undo as undoIcon } from '@wordpress/icons';
import { forwardRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

function EditorHistoryUndo( props, ref ) {
	const hasUndo = useSelect( ( select ) => {
		return applyFilters( 'isoEditor.blockEditor.hasEditorUndo', select( 'isolated/editor' ).hasEditorUndo() );
	}, [] );
	const { undo: defaultUndo } = useDispatch( 'isolated/editor' );
	const undo = applyFilters( 'isoEditor.blockEditor.undo', defaultUndo );

	return (
		<Button
			{ ...props }
			ref={ ref }
			icon={ undoIcon }
			label={ __( 'Undo' ) }
			shortcut={ displayShortcut.primary( 'z' ) }
			// If there are no undo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasUndo }
			onClick={ hasUndo ? undo : undefined }
			className="editor-history__undo"
		/>
	);
}

export default forwardRef( EditorHistoryUndo );
