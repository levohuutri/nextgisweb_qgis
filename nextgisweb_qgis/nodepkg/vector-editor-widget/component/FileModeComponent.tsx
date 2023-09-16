import { observer } from "mobx-react-lite";

import { FileUploader } from "@nextgisweb/file-upload/file-uploader";
import { ResourceSelect } from "@nextgisweb/resource/component/resource-select";

import { gettext } from "@nextgisweb/pyramid/i18n";

import type { EditorWidgetProps } from "@nextgisweb/resource/type";
import type { EditorStore } from "../EditorStore";

const msgUploadText = gettext("Select a style");
const msgHelpText = gettext("QML or SLD formats are supported.");
const msgSvgMarkerLibrary = gettext("SVG marker library");

export const FileModeComponent = observer(
    ({ store }: EditorWidgetProps<EditorStore>) => {
        return (
            <>
                <FileUploader
                    accept=".qml,.sld"
                    onChange={(value) => {
                        if (Array.isArray(value)) throw "unreachable";
                        store.setSource(value);
                    }}
                    onUploading={(value) => {
                        store.setUploading(value);
                    }}
                    uploadText={msgUploadText}
                    helpText={msgHelpText}
                />
                <label>{msgSvgMarkerLibrary}</label>
                <ResourceSelect
                    value={store.svgMarkerLibrary}
                    onChange={(value) => {
                        if (Array.isArray(value)) throw "unreachable";
                        store.setSvgMarkerLibrary(value);
                    }}
                    pickerOptions={{
                        traverseClasses: ["resource_group"],
                        requireClass: "svg_marker_library",
                        hideUnavailable: true,
                    }}
                    allowClear
                />
            </>
        );
    }
);
