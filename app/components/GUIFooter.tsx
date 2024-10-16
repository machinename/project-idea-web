'use client';

import {
    Archive,
    ArchiveOutlined,
    DeleteForeverOutlined,
    PaletteOutlined,
    MoreVert,
    RedoOutlined,
    UndoOutlined,
    RestoreFromTrashOutlined,
    NoteOutlined,
    AlarmAddOutlined,
    PushPinOutlined,
} from '@mui/icons-material';
import styles from "./GUI.module.css"
import React from 'react';
import { BackgroundCircle, BackgroundIconButton, StyledIconButton, StyledTextButton, StyledNoteButton, TransparentIconButton, TransparentIcon } from './Styled';
import { Tooltip } from '@mui/material';

interface GUIFooterProps {
    backgroundColor: '' | '#fff59c' | '#aaf0d1' | '#aaf0d1' | '#b2dfdb' | '#f5f5f5';
    contentArray: string[];
    initialOperation: 'read' | 'create';
    isArchived: boolean;
    isEditMode: boolean;
    isHovering: boolean;
    isBackgroundMenuOpen: boolean;
    isFontMenuOpen: boolean;
    isOptionsMenuOpen: boolean;
    isTrash: boolean;
    backgroundMenuRef: React.RefObject<HTMLDivElement>;
    backgroundMenuRefButton: React.RefObject<HTMLButtonElement>;
    fontMenuRef: React.RefObject<HTMLDivElement>;
    fontMenuRefButton: React.RefObject<HTMLButtonElement>;
    optionsMenuRef: React.RefObject<HTMLDivElement>;
    optionsMenuRefButton: React.RefObject<HTMLButtonElement>;
    index: React.MutableRefObject<number>;
    handleBackgroundColor: (color: '' | '#fff59c' | '#aaf0d1' | '#aaf0d1' | '#b2dfdb' | '#f5f5f5') => void;
    handleDeleteNote: () => void;
    handleRedo: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleUndo: (event: React.MouseEvent<HTMLButtonElement>) => void;
    setIsBackgroundMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFontMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOptionsMenu: React.Dispatch<React.SetStateAction<boolean>>;
    toggleArchive: () => void;
    toggleDelete: () => void;
}

export default function GUIFooter({
    backgroundColor,
    contentArray,
    isArchived,
    isEditMode,
    isBackgroundMenuOpen,
    isHovering,
    // isFontMenuOpen,
    isOptionsMenuOpen,
    isTrash,
    initialOperation,
    backgroundMenuRef,
    backgroundMenuRefButton,
    // fontMenuRef,
    // fontMenuRefButton,
    optionsMenuRef,
    optionsMenuRefButton,
    index,
    handleBackgroundColor,
    handleDeleteNote,
    handleRedo,
    handleUndo,

    setIsBackgroundMenu,
    // setIsFontMenu,
    setIsOptionsMenu,
    toggleArchive,
    toggleDelete
}: GUIFooterProps) {

    const showFooter = isEditMode || initialOperation === 'read';
    const showFooterIcons = isEditMode || (isHovering && initialOperation === 'read') || isBackgroundMenuOpen || isOptionsMenuOpen;
    const showCloseButton = initialOperation === 'create' || isEditMode;

    return (
        <React.Fragment>
            {isTrash ?
                (<div className={styles.footerWrapper}>
                    <div className={styles.footerContainer}>
                        <div className={styles.footerLeading}>
                            {
                                showFooterIcons && (
                                    <React.Fragment>
                                        <StyledIconButton aria-label="Delete note forever" onClick={() => handleDeleteNote()}>
                                            <DeleteForeverOutlined />
                                        </StyledIconButton>
                                        <StyledIconButton aria-label="Restore from trash" onClick={() => toggleDelete()}>
                                            <RestoreFromTrashOutlined />
                                        </StyledIconButton>
                                    </React.Fragment>
                                )
                            }
                        </div>

                        <Tooltip title="Note">
                            <span>
                                <StyledIconButton disabled={true}>
                                    <NoteOutlined sx={{ color: 'gray' }} />
                                </StyledIconButton>
                            </span>
                        </Tooltip>
                    </div>
                </div>)
                :
                showFooter && (
                    <div className={styles.footerWrapper}>
                        <div className={styles.footerContainer}>
                            {
                                showFooterIcons ? (
                                    <div className={styles.footerLeading}>
                                        <div className={styles.backgroundAnchor}>
                                            <StyledIconButton ref={backgroundMenuRefButton} className={styles.menuButton}
                                            // onClick={() => setIsBackgroundMenu(prev => !prev)}
                                            >
                                                <PushPinOutlined />
                                            </StyledIconButton>
                                            <StyledIconButton ref={backgroundMenuRefButton} className={styles.menuButton}
                                                onClick={() => setIsBackgroundMenu(prev => !prev)}>
                                                <AlarmAddOutlined />
                                            </StyledIconButton>
                                            <StyledIconButton ref={backgroundMenuRefButton} className={styles.menuButton}
                                                onClick={() => setIsBackgroundMenu(prev => !prev)}>
                                                <PaletteOutlined />
                                            </StyledIconButton>
                                            {isBackgroundMenuOpen && (
                                                <div className={styles.backgroundMenu}
                                                    ref={backgroundMenuRef}>
                                                    <BackgroundIconButton selected={backgroundColor === ''} onClick={() => handleBackgroundColor('')}>
                                                        <BackgroundCircle selected={backgroundColor === ''} />
                                                    </BackgroundIconButton>
                                                    <BackgroundIconButton selected={backgroundColor === '#fff59c'} onClick={() => handleBackgroundColor('#fff59c')}>
                                                        <BackgroundCircle selected={backgroundColor === '#fff59c'} bgcolor={'#fff59c'} />
                                                    </BackgroundIconButton>
                                                    <BackgroundIconButton selected={backgroundColor === '#aaf0d1'} onClick={() => handleBackgroundColor('#aaf0d1')}>
                                                        <BackgroundCircle selected={backgroundColor === '#aaf0d1'} bgcolor={'#aaf0d1'} />
                                                    </BackgroundIconButton>
                                                    <BackgroundIconButton selected={backgroundColor === '#b2dfdb'} onClick={() => handleBackgroundColor('#b2dfdb')}>
                                                        <BackgroundCircle selected={backgroundColor === '#b2dfdb'} bgcolor={'#b2dfdb'} />
                                                    </BackgroundIconButton>
                                                    <BackgroundIconButton selected={backgroundColor === '#f5f5f5'} onClick={() => handleBackgroundColor('#f5f5f5')}>
                                                        <BackgroundCircle selected={backgroundColor === '#f5f5f5'} bgcolor={'#f5f5f5'} />
                                                    </BackgroundIconButton>
                                                </div>
                                            )}
                                        </div>
                                        {initialOperation !== 'create' && (
                                            <StyledIconButton aria-label="Archive" onClick={() => toggleArchive()}>
                                                {isArchived ? <Archive /> : <ArchiveOutlined />}
                                            </StyledIconButton>
                                        )}
                                        {isEditMode && (
                                            <React.Fragment>
                                                <StyledIconButton aria-label="Undo" onClick={handleUndo} disabled={index.current === 0}>
                                                    <UndoOutlined />
                                                </StyledIconButton>
                                                <StyledIconButton aria-label="Redo" onClick={handleRedo} disabled={index.current === contentArray.length - 1}>
                                                    <RedoOutlined />
                                                </StyledIconButton>
                                            </React.Fragment>
                                        )}
                                        <div className={styles.settingsAnchor}>
                                            <StyledIconButton ref={optionsMenuRefButton} className={styles.menuButton}
                                                onClick={() => setIsOptionsMenu(prev => !prev)}>
                                                <MoreVert />
                                            </StyledIconButton>
                                            {isOptionsMenuOpen && (
                                                <div className={styles.menu} ref={optionsMenuRef}>
                                                    <StyledNoteButton type="button" onClick={toggleDelete}>Delete</StyledNoteButton>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className={styles.footerLeading}>
                                        <TransparentIconButton>
                                            <TransparentIcon />
                                        </TransparentIconButton>
                                    </div>)
                            }
                            <React.Fragment>
                                {showCloseButton && (
                                    <StyledTextButton type="submit">Close</StyledTextButton>
                                )}
                            </React.Fragment>
                            {
                                (initialOperation === 'read' && !isEditMode) && (
                                    <Tooltip title="Note" className={styles.footerType}>
                                        <span>
                                            <StyledIconButton disabled={true}>
                                                <NoteOutlined sx={{ color: 'gray' }} />
                                            </StyledIconButton>
                                        </span>
                                    </Tooltip>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    );
}