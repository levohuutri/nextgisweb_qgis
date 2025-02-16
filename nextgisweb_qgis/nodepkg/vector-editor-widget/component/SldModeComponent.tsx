import { useMemo, useCallback } from "react";
import { observer } from "mobx-react-lite";

import { StyleEditor } from "@nextgisweb/sld/style-editor";
import { SymbolizerCard } from "@nextgisweb/sld/style-editor/component/SymbolizerCard";

import type { EditorWidgetProps } from "@nextgisweb/resource/type";
import type {
    Symbolizer,
    SymbolizerType,
} from "@nextgisweb/sld/style-editor/type/Style";
import type { GeometryType } from "@nextgisweb/feature-layer/type";
import type { EditorStore } from "../EditorStore";

const GeometryToStyleTypeMap: Record<GeometryType, SymbolizerType> = {
    "POINT": "point",
    "LINESTRING": "line",
    "POLYGON": "polygon",
    "MULTIPOINT": "point",
    "MULTILINESTRING": "line",
    "MULTIPOLYGON": "polygon",
    "POINTZ": "point",
    "LINESTRINGZ": "line",
    "POLYGONZ": "polygon",
    "MULTIPOINTZ": "point",
    "MULTILINESTRINGZ": "line",
    "MULTIPOLYGONZ": "polygon",
};

export const SldModeComponent = observer(
    ({ store }: EditorWidgetProps<EditorStore>) => {
        const { sld } = store;

        const symbolizer = useMemo(() => sld?.rules[0]?.symbolizers[0], [sld]);

        const onChange = useCallback(
            (val: Symbolizer) =>
                store.setSld({ rules: [{ symbolizers: [val] }] }),

            [store]
        );

        const initType: SymbolizerType = store.geometryType
            ? GeometryToStyleTypeMap[store.geometryType]
            : "point";

        return (
            <>
                {symbolizer && <SymbolizerCard symbolizer={symbolizer} />}

                <StyleEditor
                    value={symbolizer}
                    onChange={onChange}
                    initType={initType}
                />
            </>
        );
    }
);
